import { NextResponse } from 'next/server';
import { turso } from '@/lib/turso';
import { currentUser } from '@clerk/nextjs/server';

const AUTHORIZED_EMAILS = [
  'stefanogolisano@gsa-hotels.com',
  'tiachinaglia@gmail.com'
];

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\w-]+/g, '')     // Remove all non-word chars
    .replace(/--+/g, '-')       // Replace multiple - with single -
    .replace(/^-+/, '')          // Trim - from start of text
    .replace(/-+$/, '');         // Trim - from end of text
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const offset = (page - 1) * limit;

  try {
    // Basic table check/init (Run once fallback)
    await turso.execute(`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        content TEXT NOT NULL,
        category TEXT NOT NULL CHECK(category IN ('news', 'comunica')),
        image_url TEXT,
        author TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    const result = await turso.execute({
      sql: 'SELECT * FROM blog_posts ORDER BY created_at DESC LIMIT ? OFFSET ?',
      args: [limit, offset]
    });

    const countResult = await turso.execute('SELECT COUNT(*) as total FROM blog_posts');
    const total = (countResult.rows[0] as any).total;

    return NextResponse.json({
      posts: result.rows,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Blog GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await currentUser();
    const userEmail = user?.emailAddresses[0]?.emailAddress;

    if (!userEmail || !AUTHORIZED_EMAILS.includes(userEmail)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const body = await request.json();
    const { title, content, category, image_url } = body;

    if (!title || !content || !category) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const slug = slugify(title);

    await turso.execute({
      sql: 'INSERT INTO blog_posts (title, slug, content, category, image_url, author) VALUES (?, ?, ?, ?, ?, ?)',
      args: [title, slug, content, category, image_url, userEmail]
    });

    return NextResponse.json({ success: true, slug });
  } catch (error) {
    console.error('Blog POST Error:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { turso } from '@/lib/turso';
import { currentUser } from '@clerk/nextjs/server';

const AUTHORIZED_EMAILS = [
  'stefanogolisano@gsa-hotels.com',
  'tiachinaglia@gmail.com'
];

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  try {
    // 1. Get current post
    const result = await turso.execute({
      sql: 'SELECT * FROM blog_posts WHERE slug = ?',
      args: [slug]
    });

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const post = result.rows[0];

    // 2. Get Previous Post (older)
    const prevResult = await turso.execute({
      sql: 'SELECT title, slug FROM blog_posts WHERE created_at < ? ORDER BY created_at DESC LIMIT 1',
      args: [(post as any).created_at]
    });

    // 3. Get Next Post (newer)
    const nextResult = await turso.execute({
      sql: 'SELECT title, slug FROM blog_posts WHERE created_at > ? ORDER BY created_at ASC LIMIT 1',
      args: [(post as any).created_at]
    });

    // 4. Get Related Posts (same category, excluding current)
    const relatedResult = await turso.execute({
      sql: 'SELECT title, slug, image_url, category, created_at FROM blog_posts WHERE category = ? AND slug != ? ORDER BY created_at DESC LIMIT 3',
      args: [(post as any).category, slug]
    });

    return NextResponse.json({
      post,
      prevPost: prevResult.rows[0] || null,
      nextPost: nextResult.rows[0] || null,
      relatedPosts: relatedResult.rows
    });
  } catch (error) {
    console.error('Blog Single GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const user = await currentUser();
    const userEmail = user?.emailAddresses[0]?.emailAddress;

    if (!userEmail || !AUTHORIZED_EMAILS.includes(userEmail)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    await turso.execute({
      sql: 'DELETE FROM blog_posts WHERE slug = ?',
      args: [params.slug]
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Blog DELETE Error:', error);
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}

import React from 'react';
import { turso } from '@/lib/turso';
import { currentUser } from '@clerk/nextjs/server';
import BlogCard from '@/components/BlogCard';
import BlogEditor from '@/components/BlogEditor';
import Link from 'next/link';
import BlogAnimate from '@/components/BlogAnimate';
import SuppliersDashboard from '@/components/SuppliersDashboard'; // Just for the wrapper/layout patterns if needed

const AUTHORIZED_EMAILS = [
  'stefanogolisano@gsa-hotels.com',
  'tiachinaglia@gmail.com'
];

async function getPosts(page: number, limit: number) {
  const offset = (page - 1) * limit;
  
  // Ensure table exists
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

  return {
    posts: result.rows as any[],
    total,
    totalPages: Math.ceil(total / limit)
  };
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const user = await currentUser();
  const userEmail = user?.emailAddresses[0]?.emailAddress;
  const isAuthorized = userEmail && AUTHORIZED_EMAILS.includes(userEmail);

  const currentPage = parseInt(searchParams.page || '1');
  const limit = 5; // Vertical list, small limit per page for clarity
  const { posts, total, totalPages } = await getPosts(currentPage, limit);

  return (
    <div className="blog-outer-wrapper">
      {/* Re-using some of the site's design tokens via inline styles or globals */}
      <nav className="blog-mini-nav">
        <div className="blog-container">
          <Link href="/" className="back-link">
            <i className="fas fa-chevron-left" /> Torna alla Home
          </Link>
          <div className="blog-brand">
            GSA <span>Insights</span>
          </div>
        </div>
      </nav>

      <main className="blog-container main-content">
        <header className="blog-header">
          <span className="blog-subtitle">JOURNAL D'ECCELLENZA</span>
          <h1 className="blog-title">Visione & <span>Strategy</span></h1>
          <div className="editorial-line" />
        </header>
        <section className="posts-list">
          <BlogAnimate>
            {posts.length > 0 ? (
              posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))
            ) : (
              <div className="empty-state">
                <p>Ancora nessun articolo pubblicato. Torna presto.</p>
              </div>
            )}
          </BlogAnimate>
        </section>

        {totalPages > 1 && (
          <nav className="pagination">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Link 
                key={p} 
                href={`/blog?page=${p}`}
                className={`page-link ${p === currentPage ? 'active' : ''}`}
              >
                {p}
              </Link>
            ))}
          </nav>
        )}
      </main>

      {isAuthorized && <BlogEditor />}

    </div>
  );
}

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

      <style jsx>{`
        .blog-outer-wrapper {
          background-color: #fcfcfc;
          min-height: 100vh;
          color: #1a1a1a;
          padding-top: 80px;
          padding-bottom: 100px;
        }

        .blog-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .blog-mini-nav {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 80px;
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          border-bottom: 1px solid #eee;
          z-index: 100;
        }

        .blog-mini-nav .blog-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .back-link {
          text-decoration: none;
          color: #999;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          transition: color 0.3s;
        }

        .back-link:hover {
          color: #C5A059;
        }

        .blog-brand {
          font-family: 'Montserrat', sans-serif;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          font-size: 0.9rem;
        }

        .blog-brand span {
          color: #C5A059;
          font-weight: 300;
        }

        .blog-header {
          text-align: center;
          margin-bottom: 80px;
          margin-top: 40px;
        }

        .blog-subtitle {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.7rem;
          letter-spacing: 0.4em;
          color: #C5A059;
          display: block;
          margin-bottom: 20px;
        }

        .blog-title {
          font-family: 'Montserrat', sans-serif;
          font-size: 4rem;
          font-weight: 800;
          line-height: 1;
          margin: 0;
        }

        .blog-title span {
          color: #e0e0e0;
          font-style: italic;
          font-weight: 300;
        }

        .editorial-line {
          width: 60px;
          height: 2px;
          background: #C5A059;
          margin: 40px auto 0;
        }

        .empty-state {
          text-align: center;
          padding: 100px 0;
          color: #999;
          font-family: 'Montserrat', sans-serif;
        }

        .pagination {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin-top: 60px;
        }

        .page-link {
          width: 45px;
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #eee;
          text-decoration: none;
          color: #999;
          font-family: 'Montserrat', sans-serif;
          font-weight: 700;
          border-radius: 4px;
          transition: all 0.3s;
        }

        .page-link.active {
          background: #1a1a1a;
          color: white;
          border-color: #1a1a1a;
        }

        .page-link:hover:not(.active) {
          border-color: #C5A059;
          color: #C5A059;
        }

        @media (max-width: 900px) {
          .blog-title {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </div>
  );
}

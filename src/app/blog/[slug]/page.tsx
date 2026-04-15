import React from 'react';
import { turso } from '@/lib/turso';
import Link from 'next/link';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import { notFound } from 'next/navigation';

async function getPostData(slug: string) {
  const result = await turso.execute({
    sql: 'SELECT * FROM blog_posts WHERE slug = ?',
    args: [slug]
  });

  if (result.rows.length === 0) return null;
  const post = result.rows[0];

  const prevResult = await turso.execute({
    sql: 'SELECT title, slug FROM blog_posts WHERE created_at < ? ORDER BY created_at DESC LIMIT 1',
    args: [(post as any).created_at]
  });

  const nextResult = await turso.execute({
    sql: 'SELECT title, slug FROM blog_posts WHERE created_at > ? ORDER BY created_at ASC LIMIT 1',
    args: [(post as any).created_at]
  });

  const relatedResult = await turso.execute({
    sql: 'SELECT title, slug, image_url, category, created_at FROM blog_posts WHERE category = ? AND slug != ? ORDER BY created_at DESC LIMIT 3',
    args: [(post as any).category, slug]
  });

  return {
    post: post as any,
    prevPost: prevResult.rows[0] as any || null,
    nextPost: nextResult.rows[0] as any || null,
    relatedPosts: relatedResult.rows as any[]
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const data = await getPostData(params.slug);
  if (!data) notFound();

  const { post, prevPost, nextPost, relatedPosts } = data;
  const formattedDate = format(new Date(post.created_at), 'd MMMM yyyy', { locale: it });

  return (
    <div className="article-outer-wrapper">
      <nav className="article-nav">
        <div className="article-container">
          <Link href="/blog" className="back-link">
            <i className="fas fa-arrow-left" /> Back to Blog
          </Link>
          <div className="nav-controls">
            {prevPost && (
              <Link href={`/blog/${prevPost.slug}`} className="nav-ctrl-btn" title="Precedente">
                <i className="fas fa-chevron-left" />
              </Link>
            )}
            {nextPost && (
              <Link href={`/blog/${nextPost.slug}`} className="nav-ctrl-btn" title="Successivo">
                <i className="fas fa-chevron-right" />
              </Link>
            )}
          </div>
        </div>
      </nav>

      <header className="article-header">
        <div className="article-container">
          <span className={`category-label ${post.category}`}>
            {post.category === 'comunica' ? 'GSA Comunica' : 'News'}
          </span>
          <h1 className="article-title">{post.title}</h1>
          <div className="article-meta">
            <span className="meta-date">{formattedDate}</span>
            <div className="meta-sep" />
            <span className="meta-author">GSA Editorial Team</span>
          </div>
        </div>
        {post.image_url && (
          <div className="featured-image">
            <img src={post.image_url} alt={post.title} />
          </div>
        )}
      </header>

      <main className="article-main">
        <div className="article-container">
          <div className="nav-links-row top">
             {prevPost && <Link href={`/blog/${prevPost.slug}`} className="chron-link prev">← Precedente</Link>}
             <div className="flex-spacer" />
             {nextPost && <Link href={`/blog/${nextPost.slug}`} className="chron-link next">Successivo →</Link>}
          </div>

          <div 
            className="article-body" 
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />

          <div className="nav-links-row bottom">
             {prevPost && (
               <Link href={`/blog/${prevPost.slug}`} className="chron-card prev">
                 <span>ARTICOLO PRECEDENTE</span>
                 <h4>{prevPost.title}</h4>
               </Link>
             )}
             <div className="flex-spacer" />
             {nextPost && (
               <Link href={`/blog/${nextPost.slug}`} className="chron-card next" style={{ textAlign: 'right' }}>
                 <span>PROSSIMO ARTICOLO</span>
                 <h4>{nextPost.title}</h4>
               </Link>
             )}
          </div>
        </div>
      </main>

      {relatedPosts.length > 0 && (
        <section className="related-section">
          <div className="article-container">
            <h3 className="section-title">Articoli Correlati</h3>
            <div className="related-grid">
              {relatedPosts.map(rp => (
                <Link key={rp.slug} href={`/blog/${rp.slug}`} className="related-card">
                  <div className="related-img">
                    <img src={rp.image_url || '/assets/hero-fallback.png'} alt={rp.title} />
                  </div>
                  <h4>{rp.title}</h4>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <footer className="article-footer">
        <div className="article-container">
           <Link href="/blog" className="footer-back-btn">SCOPRI ALTRE NEWS</Link>
        </div>
      </footer>

      <style jsx>{`
        .article-outer-wrapper {
          background: #fff;
          color: #1a1a1a;
          padding-bottom: 100px;
        }

        .article-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .article-nav {
          height: 80px;
          display: flex;
          align-items: center;
          border-bottom: 1px solid #eee;
          position: sticky;
          top: 0;
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(10px);
          z-index: 100;
        }

        .article-nav .article-container {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .back-link {
          text-decoration: none;
          color: #999;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .nav-controls {
          display: flex;
          gap: 15px;
        }

        .nav-ctrl-btn {
          color: #1a1a1a;
          font-size: 1.2rem;
        }

        .article-header {
          padding: 80px 0 60px;
          text-align: center;
        }

        .category-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #0066cc;
          display: block;
          margin-bottom: 25px;
        }

        .category-label.comunica {
          color: #C5A059;
        }

        .article-title {
          font-family: 'Montserrat', sans-serif;
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 30px;
        }

        .article-meta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.85rem;
          color: #999;
          font-weight: 500;
        }

        .meta-sep {
          width: 1px;
          height: 15px;
          background: #ddd;
        }

        .featured-image {
          max-width: 1200px;
          margin: 60px auto 0;
          height: 600px;
          overflow: hidden;
        }

        .featured-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .article-main {
          padding-top: 40px;
        }

        .nav-links-row {
          display: flex;
          padding: 20px 0;
          border-bottom: 1px solid #eee;
          margin-bottom: 60px;
        }

        .nav-links-row.bottom {
          border-bottom: none;
          border-top: 1px solid #eee;
          margin-bottom: 0;
          margin-top: 80px;
          padding-top: 60px;
        }

        .flex-spacer { flex: 1; }

        .chron-link {
          text-decoration: none;
          font-family: 'Montserrat', sans-serif;
          font-weight: 700;
          color: #C5A059;
          font-size: 0.8rem;
          text-transform: uppercase;
        }

        .chron-card {
          text-decoration: none;
          color: #1a1a1a;
          max-width: 45%;
        }

        .chron-card span {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.65rem;
          font-weight: 700;
          color: #999;
          letter-spacing: 0.1em;
          display: block;
          margin-bottom: 10px;
        }

        .chron-card h4 {
          font-family: 'Montserrat', sans-serif;
          font-size: 1.1rem;
          margin: 0;
          line-height: 1.4;
        }

        .article-body {
          font-family: 'Montserrat', sans-serif;
          font-size: 1.25rem;
          line-height: 1.8;
          color: #333;
        }

        .article-body :global(b), .article-body :global(strong) {
          font-weight: 700;
        }

        .article-body :global(a) {
          color: #C5A059;
          text-decoration: underline;
        }

        .related-section {
          background: #f9f9f9;
          padding: 80px 0;
          margin-top: 80px;
        }

        .section-title {
          font-family: 'Montserrat', sans-serif;
          font-size: 1.5rem;
          font-weight: 800;
          margin-bottom: 40px;
          text-align: center;
        }

        .related-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }

        .related-card {
          text-decoration: none;
          color: inherit;
        }

        .related-img {
          height: 150px;
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: 15px;
        }

        .related-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .related-card h4 {
          font-family: 'Montserrat', sans-serif;
          font-size: 1rem;
          margin: 0;
          line-height: 1.4;
        }

        .article-footer {
          padding: 80px 0;
          text-align: center;
        }

        .footer-back-btn {
          display: inline-block;
          padding: 15px 40px;
          border: 1px solid #1a1a1a;
          text-decoration: none;
          color: #1a1a1a;
          font-family: 'Montserrat', sans-serif;
          font-weight: 700;
          font-size: 0.8rem;
          letter-spacing: 0.1em;
          transition: all 0.3s;
        }

        .footer-back-btn:hover {
          background: #1a1a1a;
          color: #fff;
        }

        @media (max-width: 900px) {
          .article-title { font-size: 2.5rem; }
          .featured-image { height: 300px; }
          .related-grid { grid-template-columns: 1fr; }
          .chron-card { max-width: 100%; margin-bottom: 30px; }
          .nav-links-row.bottom { flex-direction: column; }
        }
      `}</style>
    </div>
  );
}

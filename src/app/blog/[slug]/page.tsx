import React from 'react';
import { turso } from '@/lib/turso';
import Link from 'next/link';
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
  const formattedDate = new Intl.DateTimeFormat('it-IT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date(post.created_at));

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
    </div>
  );
}

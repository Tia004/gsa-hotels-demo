import Image from 'next/image';
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
        <div className="article-container" style={{ maxWidth: '1400px' }}>
          <Link href="/blog" className="back-link" style={{ color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <i className="fas fa-arrow-left" /> BACK TO INSIGHTS
          </Link>
          <div className="nav-controls">
            {prevPost && (
              <Link href={`/blog/${prevPost.slug}`} className="nav-ctrl-btn" title="Precedente" style={{ color: 'white', padding: '10px' }}>
                <i className="fas fa-chevron-left" />
              </Link>
            )}
            {nextPost && (
              <Link href={`/blog/${nextPost.slug}`} className="nav-ctrl-btn" title="Successivo" style={{ color: 'white', padding: '10px' }}>
                <i className="fas fa-chevron-right" />
              </Link>
            )}
          </div>
        </div>
      </nav>

      <header className="article-header">
        <div className="article-container">
          <span className={`category-label ${post.category}`}>
            {post.category === 'comunica' ? 'GSA COMUNICA' : 'NEWS'}
          </span>
          <h1 className="article-title">{post.title}</h1>
          <div className="article-meta">
            <span className="meta-date">{formattedDate}</span>
            <div className="meta-sep" />
            <span className="meta-author">GSA EDITORIAL TEAM</span>
          </div>
        </div>
      </header>
      
      {post.image_url && (
        <div className="featured-image">
          <Image 
            src={post.image_url} 
            alt={post.title} 
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
      )}

      <main className="article-main">
        <div className="article-container">
          <div 
            className="article-body" 
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />

          <div className="nav-links-row bottom" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '100px', padding: '60px 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
             {prevPost && (
               <Link href={`/blog/${prevPost.slug}`} className="chron-card prev" style={{ maxWidth: '45%' }}>
                 <span style={{ fontSize: '0.7rem', color: 'var(--gold-accent)', letterSpacing: '0.2em' }}>ARTICOLO PRECEDENTE</span>
                 <h4 style={{ color: 'white', marginTop: '10px', fontSize: '1.2rem', fontFamily: 'var(--font-display)' }}>{prevPost.title}</h4>
               </Link>
             )}
             <div className="flex-spacer" />
             {nextPost && (
               <Link href={`/blog/${nextPost.slug}`} className="chron-card next" style={{ textAlign: 'right', maxWidth: '45%' }}>
                 <span style={{ fontSize: '0.7rem', color: 'var(--gold-accent)', letterSpacing: '0.2em' }}>PROSSIMO ARTICOLO</span>
                 <h4 style={{ color: 'white', marginTop: '10px', fontSize: '1.2rem', fontFamily: 'var(--font-display)' }}>{nextPost.title}</h4>
               </Link>
             )}
          </div>
        </div>
      </main>

      {relatedPosts.length > 0 && (
        <section className="related-section">
          <div className="article-container" style={{ maxWidth: '1200px' }}>
            <h3 className="section-title">Letture Consigliate</h3>
            <div className="related-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
              {relatedPosts.map(rp => (
                <Link key={rp.slug} href={`/blog/${rp.slug}`} className="related-card">
                  <div className="related-img" style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden', marginBottom: '15px' }}>
                    <Image 
                      src={rp.image_url || '/assets/hero-fallback.png'} 
                      alt={rp.title} 
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <h4 style={{ color: '#fff', fontSize: '1.2rem' }}>{rp.title}</h4>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      
      <footer className="article-footer" style={{ padding: '80px 0', textAlign: 'center' }}>
        <div className="article-container">
           <Link href="/blog" className="footer-back-btn" style={{ border: '1px solid var(--gold-accent)', color: 'var(--gold-accent)', padding: '15px 40px', fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', transition: 'all 0.3s' }}>SCOPRI ALTRE INSIGHTS</Link>
        </div>
      </footer>
    </div>
  );
}

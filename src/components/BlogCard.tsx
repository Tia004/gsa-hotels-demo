"use client";
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { useAuth, useUser } from '@clerk/nextjs';

interface BlogCardProps {
  post: {
    id: number;
    title: string;
    slug: string;
    content: string;
    category: 'news' | 'comunica';
    image_url?: string;
    created_at: string;
  };
}

const AUTHORIZED_EMAILS = [
  'stefanogolisano@gsa-hotels.com',
  'tiachinaglia@gmail.com'
];

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const { user } = useUser();
  const { isLoaded } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const userEmail = user?.emailAddresses[0]?.emailAddress;
  const isAdmin = user?.publicMetadata?.role === 'admin';
  const isAuthorized = isAdmin || (userEmail && AUTHORIZED_EMAILS.includes(userEmail));
  const isComunica = post.category === 'comunica';
  
  // Extract a short excerpt (clean HTML tags and common entities)
  const excerpt = post.content
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .substring(0, 160) + '...';

  const formattedDate = new Intl.DateTimeFormat('it-IT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date(post.created_at));

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!confirm('Sei sicuro di voler eliminare questo articolo? L\'azione è irreversibile.')) {
      return;
    }

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/blog/${post.slug}`, { method: 'DELETE' });
      if (res.ok) {
        setIsDeleted(true);
      } else {
        alert('Errore durante l\'eliminazione');
      }
    } catch (err) {
      console.error(err);
      alert('Errore di connessione');
    } finally {
      setIsDeleting(false);
    }
  };

  if (isDeleted) return null;

  return (
    <div className={`blog-card-container ${post.category}`}>
      <Link href={`/blog/${post.slug}`} className="blog-card-link">
        <div className="blog-card-image">
          <Image 
            src={post.image_url || '/assets/hero-fallback.png'} 
            alt={post.title}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <div className="blog-card-content">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span className={`blog-category-tag ${post.category}`}>
              {isComunica ? 'GSA COMUNICA' : 'NEWS'}
            </span>
            {isAuthorized && (
              <button 
                onClick={handleDelete}
                disabled={isDeleting}
                className="delete-article-btn"
                style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer', padding: '5px', borderRadius: '50%', transition: 'all 0.3s' }}
                title="Elimina articolo"
              >
                <i className={isDeleting ? 'fas fa-spinner fa-spin' : 'fas fa-trash-alt'} />
              </button>
            )}
          </div>
          <h2 className="blog-card-title">{post.title}</h2>
          <span className="blog-card-date">{formattedDate}</span>
          <p className="blog-card-excerpt">{excerpt}</p>
        </div>
      </Link>
    </div>
  );
};

export default BlogCard;

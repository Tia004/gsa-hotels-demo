"use client";

import React from 'react';
import Link from 'next/link';

interface BlogCardProps {
  post: {
    title: string;
    slug: string;
    content: string;
    category: 'news' | 'comunica';
    image_url?: string;
    created_at: string;
  };
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const isComunica = post.category === 'comunica';
  
  // Extract a short excerpt (clean HTML tags if any)
  const excerpt = post.content
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .substring(0, 180) + '...';

  const formattedDate = new Intl.DateTimeFormat('it-IT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date(post.created_at));

  return (
    <div className={`blog-card-container ${post.category}`}>
      <Link href={`/blog/${post.slug}`} className="blog-card-link">
        <div className="blog-card-image">
          <img src={post.image_url || '/assets/hero-fallback.png'} alt={post.title} />
        </div>
        <div className="blog-card-content">
          <span className={`blog-category-tag ${post.category}`}>
            {isComunica ? 'GSA Comunica' : 'News'}
          </span>
          <h2 className="blog-card-title">{post.title}</h2>
          <span className="blog-card-date">{formattedDate}</span>
          <p className="blog-card-excerpt">{excerpt}</p>
        </div>
      </Link>
      
    </div>
  );
};

export default BlogCard;

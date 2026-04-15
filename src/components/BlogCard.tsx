import React from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';

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

  const formattedDate = format(new Date(post.created_at), 'MMMM d, yyyy', { locale: it });

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
      
      <style jsx>{`
        .blog-card-container {
          background: #fff;
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: 30px;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
          width: 100%;
        }

        .blog-card-container:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.1);
        }

        .blog-card-link {
          display: flex;
          text-decoration: none;
          color: inherit;
        }

        .blog-card-image {
          flex: 0 0 350px;
          height: 250px;
          overflow: hidden;
        }

        .blog-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .blog-card-container:hover .blog-card-image img {
          transform: scale(1.05);
        }

        .blog-card-content {
          flex: 1;
          padding: 30px 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .blog-category-tag {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 15px;
          color: #0066cc; /* Default for News */
        }

        .blog-category-tag.comunica {
          color: #C5A059; /* Brand Gold for Comunica */
        }

        .blog-card-title {
          font-family: 'Montserrat', sans-serif;
          font-size: 1.6rem;
          font-weight: 800;
          line-height: 1.3;
          margin: 0 0 10px 0;
          color: #1a1a1a;
        }

        .blog-card-date {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.85rem;
          color: #0066cc;
          margin-bottom: 20px;
          text-transform: capitalize;
        }

        .blog-card-container.comunica .blog-card-date {
          color: #C5A059;
        }

        .blog-card-excerpt {
          font-family: 'Montserrat', sans-serif;
          font-size: 1rem;
          line-height: 1.6;
          color: #555;
          margin: 0;
        }

        @media (max-width: 900px) {
          .blog-card-link {
            flex-direction: column;
          }
          .blog-card-image {
            flex: none;
            width: 100%;
            height: 200px;
          }
          .blog-card-content {
            padding: 25px;
          }
          .blog-card-title {
            font-size: 1.3rem;
          }
        }
      `}</style>
    </div>
  );
};

export default BlogCard;

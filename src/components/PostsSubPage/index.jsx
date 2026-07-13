import { usePosts } from '../../hooks/usePosts';
import './styles.css';
import { useState, useEffect } from 'react';

export default function PostsSubPage() {
  const { posts, loading, error } = usePosts();

  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [selectedPost]);

  if (loading) {
    return (
      <div className="posts-list-sub" style={{ pointerEvents: 'none' }}>
        {[1, 2, 3].map((n) => (
          <div key={n} className="posts-sub-card">
            <div className="post-sub-image">
              <div className="skeleton" style={{ height: '100%', minHeight: '200px', borderRadius: '12px' }} />
            </div>
            <div className="post-sub-card-text-content" style={{ width: '100%' }}>
              <div className="post-sub-title-container">
                <div className="skeleton" style={{ height: '28px', width: '80%', marginBottom: '0.5rem' }} />
                <div className="skeleton" style={{ height: '20px', width: '60%', marginBottom: '0.5rem' }} />
              </div>
              <div className="skeleton" style={{ height: '14px', width: '25%', marginBottom: '1rem' }} />
              <div className="post-sub-content">
                <div className="skeleton" style={{ height: '16px', width: '100%', marginBottom: '0.3rem' }} />
                <div className="skeleton" style={{ height: '16px', width: '90%', marginBottom: '0.3rem' }} />
                <div className="skeleton" style={{ height: '16px', width: '75%', marginBottom: '1rem' }} />
                <div className="skeleton" style={{ height: '16px', width: '15%' }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="posts-error"><p>{error}</p></div>;
  }

  if (selectedPost) {
    return (
      <div className="post-detail-container">
        <button onClick={() => setSelectedPost(null)} className="back-btn">
          ← Voltar para o Blog
        </button>
        <img src={selectedPost.imageUrl} alt={selectedPost.title} />
        <div className="text-content">
          <h1>{selectedPost.title}</h1>
          <h3>{selectedPost.subtitle}</h3>
          <p className="author">Por: {selectedPost.author}</p>
          <div className="full-content">
            <p>{selectedPost.content}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="posts-list-sub">
      {posts.map(post => (
        <div key={post._id} className="posts-sub-card" onClick={() => setSelectedPost(post)}>
          <div className="post-sub-image">
            {post.imageUrl && (
              <img src={post.imageUrl} alt="post-img" />
            )}
          </div>
          <div className="post-sub-card-text-content">
            <div className="post-sub-title-container">
              <h2 className="post-sub-title">
                {post.title}
              </h2>
              <h3 className="post-sub-subtitle">
                {post.subtitle}
              </h3>
            </div>
            <p className="post-author">
              {post.author}
            </p>
            <div className="post-sub-content">
              <p>{post.content}</p>
              <span className='post-sub-read-more'>Ler mais</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

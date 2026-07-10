import { usePosts } from '../../hooks/usePosts';
import img from '../../assets/hero.png';
import './styles.css';
import { useState, useEffect } from 'react';

export default function PostsSubPage() {
  const { posts, loading, error } = usePosts();

  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [selectedPost]);

  if (loading) {
    return <div className='posts-loading'><p>Carregendo postagens...</p></div>;
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
        <img src={img} alt={selectedPost.title} />
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
            <img src={img} alt="Imagem do post" />
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

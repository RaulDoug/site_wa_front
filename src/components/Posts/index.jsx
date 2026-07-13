import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { usePosts } from '../../hooks/usePosts';
import { useCarousel } from '../../hooks/useCarousel';
import './styles.css';


export default function Posts() {
  const { posts, loading, error } = usePosts();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const {
    carouselRef,
    handleScroll,
    carouselProps,
    wrapperProps
  } = useCarousel(posts.length, 'post-card');

  if (loading) {
    return (
      <section id='posts' className="posts-section">
        <h2 className='post-section-title'>
          Posts & Insights
        </h2>
        <div className="carousel-wrapper">
          <div className="post-grid" style={{ overflow: 'hidden' }}>
            {[1, 2, 3].map((n) => (
              <div key={n} className="post-card" style={{ pointerEvents: 'none' }}>
                <div className="skeleton" style={{ height: '180px', borderRadius: '12px' }} />
                <div className="skeleton" style={{ height: '24px', width: '80%', marginTop: '0.5rem' }} />
                <div className="skeleton" style={{ height: '16px', width: '95%' }} />
                <div className="skeleton" style={{ height: '16px', width: '60%' }} />
                <div className="skeleton" style={{ height: '16px', width: '30%', marginTop: 'auto' }} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return <div className="posts-error"><p>{error}</p></div>;
  }

  if (posts.length === 0) {
    return null;
  }

  // Lógica de breakpoints para setinhas do carrossel
  const showArrows = windowWidth <= 360
    ? posts.length > 1
    : windowWidth <= 768
      ? posts.length > 2
      : posts.length > 3;

  return (
    <section id='posts' className="posts-section">
      <h2 className='post-section-title'>
        Posts & Insights
      </h2>
      <div className="carousel-wrapper" {...wrapperProps} >
        {showArrows && (
          <button className='carousel-arrow left' onClick={() => handleScroll('left')}>
            <FaChevronLeft />
          </button>
        )}

        <div
          ref={carouselRef}
          className="post-grid"
          {...carouselProps}
        >
          {posts.length === 0 ? (
            <p>Nenhum post a ser mostrado</p>
          ) : (
            posts.map((post) => {

              return (
                <Link key={post._id} to='/blog' state={{ postId: post._id }} className="post-card">
                  {post.imageUrl && (
                    <img src={post.imageUrl} alt="post-img" className="post-img" />
                  )}
                  {/* <img src={eventImg} alt="post-img" className='post-img' /> */}
                  <h3 className="post-title">{post.title}</h3>
                  <h4 className="post-subtitle">{post.subtitle}</h4>
                  <span className='read-post'>Ler post</span>
                </Link>
              );
            })
          )}
        </div>
        {showArrows && (
          <button className="carousel-arrow right" onClick={() => handleScroll('right')}>
            <FaChevronRight />
          </button>
        )}
      </div>
    </section>
  );
}

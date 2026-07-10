import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { usePosts } from '../../hooks/usePosts';
import { useCarousel } from '../../hooks/useCarousel';
import eventImg from '../../assets/evento.png';
import './styles.css';


export default function Posts() {
  const { posts, loading, error } = usePosts();

  const {
    carouselRef,
    handleScroll,
    carouselProps,
    wrapperProps
  } = useCarousel(posts.length, 'post-card');

  if (loading) {
    return <div className='posts-loading'><p>Carregendo postagens...</p></div>;
  }

  if (error) {
    return <div className="posts-error"><p>{error}</p></div>;
  }

  return (
    <section id='posts' className="posts-section">
      <h2 className='post-section-title'>
        Posts & Insights
      </h2>
      <div className="carousel-wrapper" {...wrapperProps} >
        <button className='carousel-arrow left' onClick={() => handleScroll('left')}>
          <FaChevronLeft />
        </button>

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
                <div key={post._id} className="post-card">
                  {/* {post.imageUrl && (
                    <img src={post.imageUrl} alt="post-img" />
                  )} */}
                  <img src={eventImg} alt="post-img" className='post-img' />
                  <h3 className="post-title">{post.title}</h3>
                  <h4 className="post-subtitle">{post.subtitle}</h4>
                  <Link to='/posts' className='read-post'>Ler post</Link>
                </div>
              );
            })
          )}
        </div>
        <button className="carousel-arrow right" onClick={() => handleScroll('right')}>
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
}

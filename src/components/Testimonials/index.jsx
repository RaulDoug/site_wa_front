import { testimonialsData } from './testimonialsData.js';
import { FaStar } from 'react-icons/fa';
import { useCarousel } from '../../hooks/useCarousel.js';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './styles.css';

export default function Testionials() {
  const {
    carouselRef,
    handleScroll,
    carouselProps,
    wrapperProps
  } = useCarousel(testimonialsData.length, 'testimonials-item');

  return (
    <section id='testimonials' className="testimonials-section">
      <h2 className="testimonials-section-title">Depoimentos</h2>
      <div className="carousel-wrapper" {...wrapperProps}>
        <button onClick={() => handleScroll('left')} className='carousel-arrow left'>
          <FaChevronLeft />
        </button>
        <ul ref={carouselRef} className="testimonials-list" {...carouselProps}>
          {testimonialsData.map((item) => {
            return (
              <li key={item.id} className="testimonials-item">
                <div className="testimonial-top">
                  <div className="initials-container">
                    <h4 className="inicial-user">{item.photo}</h4>
                  </div>
                  <div className="testimonial-top-right">
                    <p>{item.name}</p>
                    <div className="testimonial-rating">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <FaStar
                          key={index}
                          className={index < item.rating ? 'star-active' : 'star-inactive'}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="testimonial-bottom">
                  <p className='testimonial-desc'>{item.text}</p>
                  <p className='testimonial-date'>{item.Date}</p>
                </div>
              </li>
            );
          })}
        </ul>
        <button onClick={() => handleScroll('right')} className='carousel-arrow right'><FaChevronRight /></button>
      </div>
    </section>
  );
}

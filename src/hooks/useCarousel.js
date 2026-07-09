import { useState, useEffect, useRef } from 'react';

export function useCarousel(itemsLength, cardClassName, autoPlayDelay = 4000) {
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [autoPlayTrigger, setAutoplayTrigger] = useState(0);

  const resetAutoplay = () => setAutoplayTrigger(prev => prev + 1);

  const animateScroll = (element, targetScroll, duration = 350) => {
    const start = element.scrollLeft;
    const change = targetScroll - start;
    let startTime = null;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress * (2 - progress);

      element.scrollLeft = start + change * ease;

      if (elapsed < duration) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  const handleScroll = (direction) => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = carouselRef.current;
      const card = carouselRef.current.querySelector(`.${cardClassName}`);
      const scrollAmount = card ? card.clientWidth + 16 : 200; // 16px é o gap comum
      const maxScroll = scrollWidth - clientWidth;

      if (direction === 'right') {
        const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 10;
        if (isAtEnd) {
          animateScroll(carouselRef.current, 0);
        } else {
          animateScroll(carouselRef.current, scrollLeft + scrollAmount);
        }
      } else {
        const isAtStart = scrollLeft <= 10;
        if (isAtStart) {
          animateScroll(carouselRef.current, maxScroll);
        } else {
          animateScroll(carouselRef.current, scrollLeft - scrollAmount);
        }
      }
      resetAutoplay();
    }
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft);
    setScrollLeftState(carouselRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    carouselRef.current.scrollLeft = scrollLeftState - walk;
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeftState(carouselRef.current.scrollLeft);
  };

  const handleMouseLeaveOrUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    carouselRef.current.scrollLeft = scrollLeftState - walk;
  };

  useEffect(() => {
    if (isHovered || isDragging || itemsLength === 0) return;

    const interval = setInterval(() => {
      handleScroll('right');
    }, autoPlayDelay);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHovered, isDragging, itemsLength, autoPlayTrigger, autoPlayDelay]);

  // Retornamos tudo que os componentes precisam para funcionar
  return {
    carouselRef,
    handleScroll,
    carouselProps: {
      onMouseDown: handleMouseDown,
      onMouseLeave: handleMouseLeaveOrUp,
      onMouseUp: handleMouseLeaveOrUp,
      onMouseMove: handleMouseMove,
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleMouseLeaveOrUp,
    },
    wrapperProps: {
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
    }
  };
}

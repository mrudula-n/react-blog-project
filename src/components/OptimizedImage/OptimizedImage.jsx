import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './OptimizedImage.css';

function OptimizedImage({ 
  src, 
  alt, 
  width, 
  height, 
  loading = 'lazy',
  sizes = '100vw'
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = src;
            observer.unobserve(img);
          }
        });
      },
      {
        rootMargin: '50px'
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [src]);

  const handleLoad = () => setIsLoaded(true);
  const handleError = () => setIsError(true);

  return (
    <div 
      className={`optimized-image ${isLoaded ? 'is-loaded' : ''}`}
      style={{ aspectRatio: `${width}/${height}` }}
    >
      {!isLoaded && !isError && (
        <div className="optimized-image__placeholder" />
      )}
      
      {isError ? (
        <div className="optimized-image__error">
          Failed to load image
        </div>
      ) : (
        <img
          ref={imgRef}
          alt={alt}
          width={width}
          height={height}
          onLoad={handleLoad}
          onError={handleError}
          loading={loading}
          sizes={sizes}
          className="optimized-image__img"
        />
      )}
    </div>
  );
}

OptimizedImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  loading: PropTypes.oneOf(['lazy', 'eager']),
  sizes: PropTypes.string
};

export default OptimizedImage;

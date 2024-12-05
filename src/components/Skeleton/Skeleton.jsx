import { memo } from 'react';
import PropTypes from 'prop-types';
import './Skeleton.css';

const Skeleton = memo(function Skeleton({ 
  width, 
  height, 
  variant = 'rectangular',
  animation = 'wave'
}) {
  return (
    <div 
      className={`skeleton skeleton--${variant} skeleton--${animation}`}
      style={{ 
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height
      }}
    >
      <div className="skeleton__animation" />
    </div>
  );
});

Skeleton.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  variant: PropTypes.oneOf(['rectangular', 'circular', 'text']),
  animation: PropTypes.oneOf(['pulse', 'wave', 'none'])
};

export default Skeleton;

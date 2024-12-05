import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const pageVariants = {
  initial: {
    opacity: 0,
    x: -20
  },
  enter: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: {
      duration: 0.2,
      ease: 'easeIn'
    }
  }
};

function PageTransition({ children }) {
  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={pageVariants}
    >
      {children}
    </motion.div>
  );
}

PageTransition.propTypes = {
  children: PropTypes.node.isRequired
};

export default PageTransition;

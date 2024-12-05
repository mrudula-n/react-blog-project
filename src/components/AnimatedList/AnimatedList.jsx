import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import styles from './AnimatedList.module.css';

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: {
      duration: 0.2,
    },
  },
};

function AnimatedList({ items, renderItem }) {
  return (
    <motion.ul
      className={styles.animatedList}
      variants={listVariants}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence mode="popLayout">
        {items.map((item, index) => (
          <motion.li
            key={item.id}
            variants={itemVariants}
            layout
            exit="exit"
            className={styles.animatedList__item}
          >
            {renderItem(item, index)}
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  );
}

AnimatedList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ).isRequired,
  renderItem: PropTypes.func.isRequired,
};

export default AnimatedList;

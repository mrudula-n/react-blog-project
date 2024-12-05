import PropTypes from 'prop-types';
import styles from './BlogPost.module.css';

function BlogPost({ title, content, author, date, readTime }) {
  return (
    <article className={styles.blogPost}>
      <div className={styles.blogPost__header}>
        <h2 className={styles.blogPost__title}>{title}</h2>
        <div className={styles.blogPost__meta}>
          <span className={styles.blogPost__author}>By {author}</span>
          <time className={styles.blogPost__date}>{date}</time>
          <span className={styles.blogPost__readTime}>{readTime} min read</span>
        </div>
      </div>
      
      <div className={styles.blogPost__content}>
        {content}
      </div>
    </article>
  );
}

BlogPost.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  readTime: PropTypes.number.isRequired
};

export default BlogPost;

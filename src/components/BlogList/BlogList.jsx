import PropTypes from 'prop-types';
import BlogPost from '../BlogPost/BlogPost';
import styles from './BlogList.module.css';

function BlogList({ posts }) {
  return (
    <div className={styles.blogList}>
      {posts.map(post => (
        <BlogPost
          key={post.id}
          title={post.title}
          content={post.content}
          author={post.author}
          date={post.date}
          readTime={post.readTime}
        />
      ))}
    </div>
  );
}

BlogList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      readTime: PropTypes.number.isRequired
    })
  ).isRequired
};

export default BlogList;

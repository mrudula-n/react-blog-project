import PropTypes from 'prop-types';
import BlogPost from '../BlogPost/BlogPost';
import './BlogList.module.css';

function BlogList({ posts, isDarkMode }) {
  return (
    <div className="blog-list">
      {posts.map(post => (
        <BlogPost
          key={post.id}
          id={post.id}  // Pass the unique post ID here
          title={post.title}
          content={post.content}
          author={post.author}
          date={post.date}
          readTime={post.readTime}
          image={post.image} 
          isDarkMode={isDarkMode}
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
      image: PropTypes.string, 
    })
  ).isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

export default BlogList;

import PropTypes from "prop-types";
import BlogPost from "../BlogPost/BlogPost";
import styles from "./BlogList.module.css";

function BlogList({ posts, isDarkMode, onEdit }) {
  return (
    <div className={styles.blogList}>
      {posts.map((post) => (
        <BlogPost
          key={post.id}
          id={post.id}
          title={post.title}
          content={post.content}
          author={post.author}
          date={post.date}
          image={post.image}
          isDarkMode={isDarkMode}
          onEdit={() => onEdit(post)}
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
    }),
  ).isRequired,
  isDarkMode: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default BlogList;

import PropTypes from 'prop-types';

function Header({ isDarkMode, toggleDarkMode }) {
  return (
    <header className="blog-header">
      <h1>My Awesome Blog</h1>
      <nav>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
        </ul>
      </nav>

      <div className="toggle-switch" onClick={toggleDarkMode}>
        <div className={`slider ${isDarkMode ? 'dark' : ''}`}></div>
      </div>
    </header>
  );
}

Header.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  toggleDarkMode: PropTypes.func.isRequired,
};

export default Header;

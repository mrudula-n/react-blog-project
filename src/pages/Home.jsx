// src/pages/Home.jsx
import { useState } from 'react';
import BlogList from '../components/BlogList/BlogList';
import styles from './Home.module.css';

function Home() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  return (
    <div className={styles.home}>
      <main className={styles.mainContent}>
        <BlogList isDarkMode={isDarkMode} />
      </main>
    </div>
  );
}

export default Home;

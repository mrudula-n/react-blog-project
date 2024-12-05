// src/components/Layout
import { Outlet, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import Sidebar from '../Sidebar/Sidebar';
import Footer from '../Footer/Footer';
import PostManager from "../PostManager/PostManager";
import FormExample from '../FormExample/FormExample';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import styles from './Layout.module.css';

function Layout() {
  const location = useLocation();

  // Define paths where PostManager and FormExample should not be visible
  const excludedPaths = ["/login", "/posts/new"];

  // Check if the current path is excluded
  const shouldShowExtras = !excludedPaths.includes(location.pathname);

  return (
    <div className={styles.layout}>
      <Navigation />

      <div className={styles.layout__content}>
        <main className={styles.layout__main}>
          <ThemeSwitcher />

          {/* Conditionally render PostManager and FormExample */}
          {shouldShowExtras && (
            <>
              <PostManager />
              <FormExample />
            </>
          )}

          <Outlet />
        </main>

        <Sidebar className={styles.layout__sidebar} />
      </div>

      <Footer />
    </div>
  );
}

export default Layout;

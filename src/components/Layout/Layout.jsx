// src/components/Layout
import { Outlet, useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import PostManager from "../PostManager/PostManager";
import FormExample from "../FormExample/FormExample";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import PageTransition from "../PageTransition/PageTransition";
import styles from "./Layout.module.css";

function Layout() {
  const location = useLocation();

  // Define paths where PostManager and FormExample should not be visible
  const excludedPaths = ["/login", "/posts/new", "/settings"];

  // Check if the current path is excluded
  const shouldShowExtras = !excludedPaths.includes(location.pathname);

  return (
    <div className={styles.layout}>
      <Navigation />

      <div className={styles.layout__content}>
        <main className={styles.layout__main}>
          <PageTransition>
          {/* Theme Switcher always visible */}
          <ThemeSwitcher />

          {/* Conditionally render PostManager and FormExample */}
          {shouldShowExtras && (
            <>
              <PostManager />
              <FormExample />
            </>
          )}

          {/* Render page-specific content */}
          <Outlet />
          </PageTransition>
        </main>

        {/* Sidebar is always visible */}
        <Sidebar className={styles.layout__sidebar} />
      </div>

      {/* Footer is always visible */}
      <Footer />
    </div>
  );
}

export default Layout;

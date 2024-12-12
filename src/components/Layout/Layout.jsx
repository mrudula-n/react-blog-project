// src/components/Layout
// Import necessary components from React Router
import { Outlet, useLocation } from "react-router-dom";
// Import other components for the layout
import Navigation from "../Navigation/Navigation";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
// Import CSS styles for the component
import styles from "./Layout.module.css";

// Define the Layout functional component
function Layout() {
  // Get the current location object using the useLocation hook
  const location = useLocation();

  // Define an array of paths where certain components should not be rendered
  const excludedPaths = [
    "/login",
    "/posts/new",
    "/posts",
    "/profile",
    "/settings",
  ];

  // Check if the current path is in the excluded paths array
  const shouldShowExtras = !excludedPaths.includes(location.pathname);

  // Render the component JSX
  return (
    // Main container for the layout
    <div className={styles.layout}>
      {/* Render the navigation component */}
      <Navigation />

      {/* Container for the main content and sidebar */}
      <div className={styles.layout__content}>
        {/* Main content area */}
        <main className={styles.layout__main}>
          {/* Render the outlet for nested routes */}
          <Outlet />
        </main>

        {/* Render the sidebar component */}
        <Sidebar className={styles.layout__sidebar} />
      </div>

      {/* Render the footer component */}
      <Footer />
    </div>
  );
}

// Export the Layout component as the default export
export default Layout;

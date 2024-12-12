// src/components/Layout
import { Outlet, useLocation } from 'react-router-dom';  // Import Outlet for rendering nested routes and useLocation to get the current path.
import Navigation from '../Navigation/Navigation';  // Import the Navigation component.
import Sidebar from '../Sidebar/Sidebar';  // Import the Sidebar component.
import Footer from '../Footer/Footer';  // Import the Footer component.
import PostManager from "../PostManager/PostManager"; // Import the PostManager component.
import FormExample from '../FormExample/FormExample'; // Import the FormExample component.
import styles from './Layout.module.css'; // Import CSS styles for the layout.

function Layout() {
  const location = useLocation(); // Get the current location using the useLocation hook.  This gives you access to pathname, search, etc.

  // Define an array of paths where PostManager and FormExample should not be rendered.
  const excludedPaths = ["/login", "/posts/new", "/posts", "/profile"];

  // Check if the current path is in the excludedPaths array.
  const shouldShowExtras = !excludedPaths.includes(location.pathname); //if current path is in excluded path then shouldShowExtras will be false

  return (
    <div className={styles.layout}> {/* Main layout container */}
      <Navigation /> {/* Render the Navigation component */}

      <div className={styles.layout__content}> {/* Container for main content and sidebar */}
        <main className={styles.layout__main}> {/* Main content area */}

          {/* Conditionally render PostManager and FormExample based on shouldShowExtras */}
          {shouldShowExtras && (  //if shouldShowExtras is true then render PostManager and FormExample components
            <>
              <PostManager />
              <FormExample />
            </>
          )}

          <Outlet /> {/* Render the child routes (nested routes) defined in the routing configuration */}
        </main>

        <Sidebar className={styles.layout__sidebar} /> {/* Render the Sidebar component */}
      </div>

      <Footer /> {/* Render the Footer component */}
    </div>
  );
}

export default Layout;

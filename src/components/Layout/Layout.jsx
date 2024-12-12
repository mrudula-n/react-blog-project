import { Outlet } from 'react-router-dom'; // Import Outlet component for rendering nested routes.
import Navigation from '../Navigation/Navigation'; // Import Navigation component.
import Sidebar from '../Sidebar/Sidebar'; // Import Sidebar component.
import Footer from '../Footer/Footer'; // Import Footer component.
import styles from './Layout.module.css'; // Import CSS modules for styling.

function Layout() { // Component function for the main layout.
  return (
    <div className={styles.layout}> {/* Main container for the layout. */}
      <Navigation /> {/* Render the Navigation component. */}

      <div className={styles.layout__content}> {/* Container for main content and sidebar. */}
        <main className={styles.layout__main}> {/* Main content area. */}
          <Outlet /> {/* Render the child routes (nested routes) at this location using Outlet. */}
        </main>

        <Sidebar className={styles.layout__sidebar} /> {/* Render the Sidebar component. */}
      </div>

      <Footer /> {/* Render the Footer component. */}
    </div>
  );
}

export default Layout; // Export the Layout component as the default export.

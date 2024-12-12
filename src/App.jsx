import { RouterProvider } from 'react-router-dom'; // Import RouterProvider for routing.
import { router } from './router/index'; // Import router configuration.
import './App.css'; // Import global CSS styles.

function App() { // Main App component function.

  return (
    <div>  {/* Main container div. */}
      <RouterProvider router={router} />  {/* Render the router to handle navigation.  */}
    </div>
  );
}

export default App; // Export the App component as the default export.

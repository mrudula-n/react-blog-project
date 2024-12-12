// src/App.jsx
// Imports RouterProvider for rendering the application's routes.
import { RouterProvider } from 'react-router-dom';
// Imports AuthProvider for managing authentication context.
import { AuthProvider } from "./contexts/AuthContext";
// Imports AppProviders, likely for providing other application-wide contexts or configurations.
import { AppProviders } from "./providers/AppProviders";
// Imports the router configuration.
import { router } from './router/index';
// Imports the main CSS file for styling.
import './App.css';

// Defines the main App component.
function App() {
  return (
    <div> {/* Root div container for the app */}
      {/* Provides authentication context to the entire application. */}
      <AuthProvider>
        {/* Provides other application-level contexts or configurations. */}
        <AppProviders>
          {/* Renders the application's routes based on the defined router configuration. */}
          <RouterProvider router={router} />
        </AppProviders>
      </AuthProvider>
    </div>
  );
}

// Exports the App component as the default export.
export default App;

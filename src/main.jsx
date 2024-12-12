// Import StrictMode for highlighting potential problems in an application.
import { StrictMode } from "react";
// Import createRoot for rendering the application.
import { createRoot } from "react-dom/client";
// Import the global CSS file.
import "./index.css";
// Import the main App component.
import App from "./App.jsx";

// Get the root element from the HTML document.
// Render the App component inside a StrictMode component.
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Import the Header component from the './components/Header' file. This assumes you have a Header.js file in a 'components' folder.
import Header from "./components/Header";

// Define the App component, a functional component. This is the main component of your application.
function App() {
  // Return the JSX to be rendered.  JSX allows you to write HTML-like syntax within JavaScript.
  return (
    // The outermost div with a class of 'app'. This serves as the container for the entire application.
    <div className="app">
      {/* Render the Header component. This will display the content of the Header component at this position in the app. */}
      <Header />

      {/* The main content area of the app */}
      <main>
        {/* Display a heading */}
        <h2>Welcome to my blog!</h2>
        {/* Display a paragraph */}
        <p>This is my first React component.</p>
      </main>
    </div>
  );
}

// Export the App component as the default export. This allows other modules to import it using 'import App from './App';'.
export default App;

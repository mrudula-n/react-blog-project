import { useState } from "react"; // Imports the useState hook from React library for managing component state.
import { useAuthContext } from "../Context/AuthContext"; // Imports the useAuthContext hook from a custom context for authentication-related logic.
import styles from "./Login.module.css"; // Imports CSS styles from a CSS module file.

function Login() {
  // Initializes state variable 'credentials' with an object containing username and password, both initially empty strings.
  const { login } = useAuthContext(); // Accesses the 'login' function from the AuthContext. This function is presumably used for user authentication.
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  // Initializes state variable 'error' to null, used for displaying error messages.  
  const [error, setError] = useState(null);

  // Event handler function for input changes.
  const handleChange = (e) => {
    // Destructures 'name' and 'value' properties from the event target (the input element).
    const { name, value } = e.target;
    // Updates the 'credentials' state by merging the existing state with the new value for the corresponding input field.
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    // Prevents the default form submission behavior (page reload).
    e.preventDefault();
    // try...catch block for handling potential errors during login.    
    try {
      // Sets the 'error' state to null to clear any previous error messages.
      setError(null); 
      // Calls the 'login' function from the AuthContext with the 'credentials' state.  'await' indicates that this function is asynchronous.      
      await login(credentials);
      // Displays a success alert if login is successful.
      alert("Logged in successfully!");      
    } catch (err) {
      // If an error occurs during login, sets the 'error' state to the error message.
      setError(
        err.message || "Login failed. Please check your username and password."
      ); 
    }
  };

  // Returns the JSX to render the login form.
  return (
    <div className={styles.loginPage}> {/* Container for the login page with styles applied */}
      <h2>Login</h2> {/* Heading for the login form */}
      <form onSubmit={handleSubmit}> {/* Form element with 'handleSubmit' function called on submission */}
        <div className={styles.formGroup}> {/* Container for username input field with styles applied */}
          <label htmlFor="username">Username:</label> {/* Label for username input */}
          <input
            type="text"  // Input field of type text 
            id="username" // id attribute for the input field 
            name="username" // name attribute, used for identifying the input field 
            value={credentials.username}  // Sets the value of the input field to the 'username' from the 'credentials' state 
            onChange={handleChange}  // 'handleChange' function is called when the input value changes 
            required // Marks the input field as required 
          />
        </div>
        <div className={styles.formGroup}> {/* Container for password input field with styles applied */}
          <label htmlFor="password">Password:</label> {/* Label for password input */}
          <input
            type="password" // Input field of type password for secure entry
            id="password"  // id attribute for the input field 
            name="password" // name attribute for the input field 
            value={credentials.password} // Sets the value to the 'password' from the 'credentials' state 
            onChange={handleChange}  // 'handleChange' function called when input value changes 
            required //Marks the field as required 
          />
        </div>
        {/* Conditionally renders an error message if 'error' state is not null */}
        {error && <p className={styles.error}>{error}</p>} 
        <button type="submit">Login</button> {/* Submit button for the form */}
      </form>
    </div>
  );
}

// Exports the 'Login' component as the default export.
export default Login;

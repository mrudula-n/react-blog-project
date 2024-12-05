import { useState } from "react";
import { useAuthContext } from "../Context/AuthContext";
import styles from "./Login.module.css";

function Login() {
  const { login } = useAuthContext();
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null); // Clear any existing error
      await login(credentials);
      alert("Logged in successfully!");
    } catch (err) {
      setError(
        err.message || "Login failed. Please check your username and password."
      ); // Set error message
    }
  };

  return (
    <div className={styles.loginPage}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        {/* Display error message */}
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;

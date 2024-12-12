// Import necessary components from React library
import { createContext, useContext } from "react";
// Import the useAuth custom hook for authentication logic
import { useAuth } from "../hooks/useAuth";

// Create a context for authentication data using createContext
const AuthContext = createContext();


// Define the AuthProvider component to provide authentication context to its children
export function AuthProvider({ children }) { // Receives children prop to render the application's content
    // Use the useAuth hook to access authentication functions and state
  const auth = useAuth();
    // Render the component JSX
  return (
        // Provide the auth object to all child components through AuthContext.Provider
    <AuthContext.Provider value={auth}>
      {children} {/* Render the children components within the provider */}
    </AuthContext.Provider>
  );
}


// Define a custom hook to easily access the authentication context
export function useAuthContext() {
    // Return the value of the AuthContext using the useContext hook
  return useContext(AuthContext);
}

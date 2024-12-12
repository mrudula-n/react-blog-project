import { createContext, useContext } from "react"; // Import createContext and useContext for creating and accessing context.
import { useAuth } from "../hooks/useAuth"; // Import a custom hook for authentication.

const AuthContext = createContext(); // Create a context for authentication using createContext.  This will hold the authentication state and functions.

export function AuthProvider({ children }) { // Component that provides the authentication context to its children.  This is the context provider.
  const auth = useAuth(); // Call the custom useAuth hook to get the authentication object (which likely contains user info, login/logout functions).
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>; // Provide the auth object to all child components wrapped within AuthProvider.  
}

export function useAuthContext() {  // A custom hook to easily access the authentication context.  This is a context consumer.
  return useContext(AuthContext);  //returns the value of the AuthContext using the useContext hook. This allows components to access the authentication object without prop drilling.
}

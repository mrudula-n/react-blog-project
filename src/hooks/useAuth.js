import { useState, useEffect, useCallback } from "react"; // Import necessary hooks from React.

export function useAuth() { // A custom hook for managing authentication state and actions.
  const [user, setUser] = useState(null); // State for the currently logged-in user. Initialized to null.
  const [isLoading, setIsLoading] = useState(true); // State for tracking loading status during login. Initialized to true.

  // useEffect to load user data from localStorage when the component mounts.
  useEffect(() => {
    const storedUser = localStorage.getItem("auth_user");  //retrieve user data from localStorage. Key is "auth_user"
    if (storedUser) {  //if user data exists in localStorage
      setUser(JSON.parse(storedUser));  //parse the JSON string and update the user state
    }
    setIsLoading(false);   //set isLoading to false after loading user data
  }, []);  // Empty dependency array means this effect runs only once on mount.

    // useCallback for memoizing the login function. This prevents unnecessary re-renders.  Good practice for performance.
  const login = useCallback(async (credentials) => {  // Function for logging in a user. Takes credentials as an argument.
    try {
      setIsLoading(true);  // Set isLoading to true while logging in.
      // Mock authentication logic (replace with actual API call in a real application)
      if (credentials.username === "admin" && credentials.password === "password") {  // Check if credentials match hardcoded admin user.  
        const mockUser = {    //create a mock user object
          id: 1,
          username: credentials.username,
          email: `${credentials.username}@example.com`,
          role: "user",
        };
        setUser(mockUser);  // Set the user state to the mock user.
        localStorage.setItem("blog_user", JSON.stringify(mockUser));  // Store the user in localStorage for persistence.  Note: key is "blog_user", different from "auth_user" above. Potential bug?
        return mockUser;      // Return the mock user object.
      } else {
        throw new Error("Invalid username or password");  // Throw an error if credentials are invalid.
      }
    } catch (error) {
      throw error; // Re-throw the error to be handled by the caller.  Important for error handling.
    } finally {
      setIsLoading(false); // Set isLoading to false in the finally block to ensure it's always reset after login attempt.
    }
  }, []); // Empty dependency array means this function is memoized and will only be re-created if dependencies change.

  // useCallback for memoizing the logout function
  const logout = useCallback(() => {  //function for logging out a user
    setUser(null);   //set the user state to null
    localStorage.removeItem("auth_user");   //remove user data from localStorage, uses key "auth_user"
  }, []);   // Empty dependency array for memoization.

  // useCallback for memoizing the updateProfile function
  const updateProfile = useCallback((updates) => {  //function to update user profile
    setUser((prevUser) => { //takes updates object and merges it with existing user data
      const updatedUser = { ...prevUser, ...updates };  //create a new user object with updated data
      localStorage.setItem("auth_user", JSON.stringify(updatedUser));  //update localStorage with new user data using key "auth_user"
      return updatedUser;  //return updated user object
    });
  }, []);  // Empty dependency array for memoization.


  return {    //return an object with authentication related data and functions
    user,      //current logged in user
    isLoading,    //loading state
    isAuthenticated: !!user,  //boolean indicating whether user is authenticated
    login,       //login function
    logout,      //logout function
    updateProfile, //updateProfile function
  };
}

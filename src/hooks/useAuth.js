import { useState, useEffect, useCallback } from "react";

export function useAuth() {
  const [user, setUser] = useState(null); // Logged-in user
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("auth_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Log in a user
  const login = useCallback(async (credentials) => {
    try {
      setIsLoading(true);
      if (credentials.username === "admin" && credentials.password === "password") {
        const mockUser = {
          id: 1,
          username: credentials.username,
          email: `${credentials.username}@example.com`,
          role: "user",
        };
        setUser(mockUser);
        localStorage.setItem("blog_user", JSON.stringify(mockUser));
        return mockUser;
      } else {
        throw new Error("Invalid username or password");
      }
    } catch (error) {
      throw error; 
    } finally {
      setIsLoading(false);
    }
  }, []);
  

  // Log out a user
  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("auth_user");
  }, []);

  // Update user profile
  const updateProfile = useCallback((updates) => {
    setUser((prevUser) => {
      const updatedUser = { ...prevUser, ...updates };
      localStorage.setItem("auth_user", JSON.stringify(updatedUser));
      return updatedUser;
    });
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    updateProfile,
  };
}

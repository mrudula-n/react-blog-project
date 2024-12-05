import { useState, useEffect, useCallback } from "react";

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "light"; // Default to "light" if no theme is saved
  });

  // Update the DOM and localStorage whenever the theme changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle between light and dark themes
  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }, []);

  return {
    theme,
    isDark: theme === "dark",
    toggleTheme,
    setTheme,
  };
}

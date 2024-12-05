import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const PreferencesContext = createContext();

const defaultPreferences = {
  fontSize: "base", // Options: 'small', 'base', 'large'
  reducedMotion: false, // Boolean: true for reduced animations
  language: "en", // Options: 'en', 'es', etc.
  layoutDensity: "comfortable", // Options: 'compact', 'comfortable'
};

export function PreferencesProvider({ children }) {
  const [preferences, setPreferences] = useState(() => {
    const saved = localStorage.getItem("blog_preferences");
    return saved ? JSON.parse(saved) : defaultPreferences;
  });

  useEffect(() => {
    // Save preferences to localStorage whenever they change
    localStorage.setItem("blog_preferences", JSON.stringify(preferences));

    // Apply font size and layout density to the root element
    const root = document.documentElement;

    // Apply font size
    const fontSizeMap = {
      small: "14px",
      base: "16px",
      large: "18px",
    };
    root.style.setProperty("--font-size", fontSizeMap[preferences.fontSize]);

    // Apply layout density
    const layoutDensityMap = {
      compact: "0.5rem",
      comfortable: "1rem",
    };
    root.style.setProperty(
      "--spacing",
      layoutDensityMap[preferences.layoutDensity]
    );
  }, [preferences]);

  const updatePreference = (key, value) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetPreferences = () => {
    setPreferences(defaultPreferences);
  };

  return (
    <PreferencesContext.Provider
      value={{ preferences, updatePreference, resetPreferences }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}

PreferencesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error("usePreferences must be used within a PreferencesProvider");
  }
  return context;
};

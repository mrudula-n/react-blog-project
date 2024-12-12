// Imports the useTheme hook from the ThemeContext to access and modify the theme.
import { useTheme } from "../../contexts/ThemeContext";
// Imports the usePreferences hook from the PreferencesContext to access and modify user preferences.
import { usePreferences } from "../../contexts/PreferencesContext";
// Imports CSS styles specific to the Settings component.
import styles from "./Settings.module.css";

function Settings() {
  // Accesses the theme and the toggleTheme function from the ThemeContext.
  const { theme, toggleTheme } = useTheme();
  // Accesses preferences, updatePreference, and resetPreferences from the PreferencesContext.
  const { preferences, updatePreference, resetPreferences } = usePreferences();

  return (
    <div className={styles.settings}>
      {/* Settings Page Title */}
      <h2 className={styles.settingsTitle}>Settings</h2>

      {/* Theme Settings Section */}
      <section className={styles.settingsSection}>
        <h3 className={styles.settingsSubtitle}>Theme</h3>
        <label className={styles.settingItem}> {/* Container for the theme setting */}
          <span>Dark Mode</span> {/* Label for the checkbox */}
          <input
            type="checkbox" // Checkbox input for toggling dark mode
            checked={theme === "dark"} // Checked if the current theme is "dark"
            onChange={toggleTheme} // Calls toggleTheme to switch themes on change
          />
        </label>
      </section>

      {/* Preferences Settings Section */}
      <section className={styles.settingsSection}>
        <h3 className={styles.settingsSubtitle}>Preferences</h3>

        {/* Font Size Setting */}
        <label className={styles.settingItem}>
          <span>Font Size</span>
          <select  // Dropdown menu for font size selection
            value={preferences.fontSize}  // Sets the current font size from preferences
            onChange={(e) =>
              updatePreference("fontSize", e.target.value)  // Updates font size preference on change
            }
          >
            <option value="small">Small</option>
            <option value="base">Medium</option>
            <option value="large">Large</option>
          </select>
        </label>

        {/* Reduced Motion Setting */}
        <label className={styles.settingItem}>
          <span>Reduced Motion</span>
          <input
            type="checkbox"   // Checkbox for reduced motion
            checked={preferences.reducedMotion} // Checked based on reducedMotion preference
            onChange={(e) =>
              updatePreference("reducedMotion", e.target.checked)   // Updates reduced motion preference
            }
          />
        </label>

        {/* Language Setting */}
        <label className={styles.settingItem}>
          <span>Language</span>
          <select    // Dropdown for language selection
            value={preferences.language}    // Current language from preferences
            onChange={(e) =>
              updatePreference("language", e.target.value)    // Updates language preference
            }
          >
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </label>

        {/* Layout Density Setting */}
        <label className={styles.settingItem}>
          <span>Layout Density</span>
          <select    // Dropdown for layout density
            value={preferences.layoutDensity}  // Current layout density from preferences
            onChange={(e) =>
              updatePreference("layoutDensity", e.target.value)   // Updates layout density preference
            }
          >
            <option value="comfortable">Comfortable</option>
            <option value="compact">Compact</option>
          </select>
        </label>
      </section>

      {/* Button to reset all preferences to default values */}
      <button onClick={resetPreferences} className={styles.resetButton}>  //onClick calls resetPreferences function which sets the preferences to defaultPreferences
        Reset to Defaults
      </button>
    </div>
  );
}

export default Settings;

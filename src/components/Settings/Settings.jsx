import { useTheme } from "../../contexts/ThemeContext";
import { usePreferences } from "../../contexts/PreferencesContext";
import styles from "./Settings.module.css";

function Settings() {
  const { theme, toggleTheme } = useTheme();
  const { preferences, updatePreference, resetPreferences } = usePreferences();

  return (
    <div className={styles.settings}>
      <h2 className={styles.settingsTitle}>Settings</h2>

      <section className={styles.settingsSection}>
        <h3 className={styles.settingsSubtitle}>Theme</h3>
        <label className={styles.settingItem}>
          <span>Dark Mode</span>
          <input
            type="checkbox"
            checked={theme === "dark"}
            onChange={toggleTheme}
          />
        </label>
      </section>

      <section className={styles.settingsSection}>
        <h3 className={styles.settingsSubtitle}>Preferences</h3>

        {/* Font Size Preference */}
        <label className={styles.settingItem}>
          <span>Font Size</span>
          <select
            value={preferences.fontSize}
            onChange={(e) => updatePreference("fontSize", e.target.value)}
          >
            <option value="small">Small</option>
            <option value="base">Medium</option>
            <option value="large">Large</option>
          </select>
        </label>

        {/* Reduced Motion Preference */}
        <label className={styles.settingItem}>
          <span>Reduced Motion</span>
          <input
            type="checkbox"
            checked={preferences.reducedMotion}
            onChange={(e) =>
              updatePreference("reducedMotion", e.target.checked)
            }
          />
        </label>

        {/* Language Preference */}
        <label className={styles.settingItem}>
          <span>Language</span>
          <select
            value={preferences.language}
            onChange={(e) => updatePreference("language", e.target.value)}
          >
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </label>

        {/* Layout Density Preference */}
        <label className={styles.settingItem}>
          <span>Layout Density</span>
          <select
            value={preferences.layoutDensity}
            onChange={(e) =>
              updatePreference("layoutDensity", e.target.value)
            }
          >
            <option value="comfortable">Comfortable</option>
            <option value="compact">Compact</option>
          </select>
        </label>
      </section>

      {/* Reset Button */}
      <button onClick={resetPreferences} className={styles.resetButton}>
        Reset to Defaults
      </button>
    </div>
  );
}

export default Settings;

import { useTheme } from "../../hooks/useTheme";
import styles from "./ThemeSwitcher.module.css";

function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className={styles.themeSwitcher}>
      Switch to {theme === "light" ? "Dark" : "Light"} Mode
    </button>
  );
}

export default ThemeSwitcher;

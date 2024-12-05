import { ThemeProvider } from '../contexts/ThemeContext';
import { PreferencesProvider } from '../contexts/PreferencesContext';
import { BlogProvider } from '../contexts/BlogContext';
import PropTypes from 'prop-types';

export function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <PreferencesProvider>
        <BlogProvider>{children}</BlogProvider>
      </PreferencesProvider>
    </ThemeProvider>
  );
}

AppProviders.propTypes = {
  children: PropTypes.node.isRequired,
};

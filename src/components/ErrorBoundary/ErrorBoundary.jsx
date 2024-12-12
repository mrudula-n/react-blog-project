import React from "react";
import PropTypes from "prop-types";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import styles from "./ErrorBoundary.module.css";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className={styles.errorBoundary}>
      <h2>Something went wrong</h2>
      <p>{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        className={styles.errorBoundaryRetry}
      >
        Try Again
      </button>
    </div>
  );
}

function ErrorBoundary({ children, fallback }) {
  return (
    <ReactErrorBoundary
      FallbackComponent={fallback || ErrorFallback}
      onReset={() => {
        // Reset the state or reload the page if necessary
        window.location.reload();
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.func,
};

export default ErrorBoundary;

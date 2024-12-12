// Import the memo function for performance optimization.
import { memo } from "react";
// Import PropTypes for prop type checking.
import PropTypes from "prop-types";
// Import CSS styles specific to this component as a module.
import styles from "./Pagination.module.css";

// Define the functional component Pagination and memoize it for performance optimization.
const Pagination = memo(function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  // Create an array of page numbers from 1 to totalPages.
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Return the JSX to render the component.
  return (
    <div className={styles.pagination}>
      {/* Button to navigate to the previous page. */}
      <button
        className={styles.paginationButton}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1} // Disable if on the first page.
      >
        Previous
      </button>
      {/* Container for page number buttons. */}
      <div className={styles.pageNumbers}>
        {/* Map over the pageNumbers array to render a button for each page. */}
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={`${styles.pageNumber} ${ // Apply active class if the current page matches the number.
              number === currentPage ? styles.active : ""
            }`}
            onClick={() => onPageChange(number)}
          >
            {number}
          </button>
        ))}
      </div>
        {/* Button to navigate to the next page. */}
      <button
        className={styles.paginationButton}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages} // Disable if on the last page.
      >
        Next
      </button>
    </div>
  );
});

// Define PropTypes for the component's props.
Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,  // currentPage is required and must be a number.
  totalPages: PropTypes.number.isRequired,   // totalPages is required and must be a number.
  onPageChange: PropTypes.func.isRequired,  // onPageChange is required and must be a function.
};

// Export the Pagination component as the default export.
export default Pagination;

import { memo } from "react";
import PropTypes from "prop-types";
import styles from "./Pagination.module.css"; // Import CSS as a module

const Pagination = memo(function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={styles.pagination}>
      <button
        className={styles.paginationButton}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <div className={styles.pageNumbers}>
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={`${styles.pageNumber} ${
              number === currentPage ? styles.active : ""
            }`}
            onClick={() => onPageChange(number)}
          >
            {number}
          </button>
        ))}
      </div>
      <button
        className={styles.paginationButton}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
});

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;

import { useForm } from "../../hooks/useForm";
import { useState } from "react";
import styles from "./FormExample.module.css";

function FormExample() {
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Name is required";
    } else if (values.name.length < 3) {
      errors.name = "Name must be at least 3 characters";
    }

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = "Email is invalid";
    }

    return errors;
  };

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
  } = useForm({ name: "", email: "" }, validate);

  const onSubmit = async (formData) => {
    // Save the form data to localStorage
    const existingData = JSON.parse(localStorage.getItem("formData")) || [];
    const updatedData = [...existingData, formData];
    localStorage.setItem("formData", JSON.stringify(updatedData));

    alert(`Form Submitted and Saved to LocalStorage: ${JSON.stringify(formData)}`);
    reset(); // Reset form after successful submission
    setHasSubmitted(false); // Reset submission state
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setHasSubmitted(true); // Mark form as submitted
    handleSubmit(onSubmit); // Validate and submit
  };

  return (
    <div className={styles.formContainer}>
      <h2>Form Example</h2>
      <form onSubmit={handleFormSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.name && hasSubmitted ? styles.errorInput : ""}
          />
          {errors.name && hasSubmitted && (
            <span className={styles.error}>{errors.name}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.email && hasSubmitted ? styles.errorInput : ""}
          />
          {errors.email && hasSubmitted && (
            <span className={styles.error}>{errors.email}</span>
          )}
        </div>

        <div className={styles.actions}>
          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
          <button
            type="button"
            onClick={() => {
              reset();
              setHasSubmitted(false); // Reset submission state
            }}
            className={styles.resetButton}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormExample;

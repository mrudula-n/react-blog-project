import { useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "../../hooks/useForm";
import styles from "./FormExample.module.css";

function FormExample() {
  // State to track if the form has been submitted
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Validation function for form fields
  const validate = (values) => {
    const errors = {};
    // Name validation: required and minimum 3 characters
    if (!values.name) {
      errors.name = "Name is required";
    } else if (values.name.length < 3) {
      errors.name = "Name must be at least 3 characters";
    }
    // Email validation: required and valid format
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = "Email is invalid";
    }
    return errors;
  };

  // useForm hook to manage form state, validation, and submission
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
  } = useForm({ name: "", email: "" }, validate);

  // Function to handle form submission after validation
  const onSubmit = async (formData) => {
    // Save form data to localStorage
    const existingData = JSON.parse(localStorage.getItem("formData")) || []; // Get existing or initialize empty
    const updatedData = [...existingData, formData];   // Add new form data to existing
    localStorage.setItem("formData", JSON.stringify(updatedData));   // Store updated data in localStorage

    // Alert with submitted data
    alert(`Form Submitted and Saved to LocalStorage: ${JSON.stringify(formData)}`);
    reset();    // Reset the form fields
    setHasSubmitted(false); // Reset submission state
  };

    //handles the actual form submission event
  const handleFormSubmit = (e) => {
    e.preventDefault();   // Prevent default form submission behavior
    setHasSubmitted(true); // Set submitted state to true to trigger validation display
    handleSubmit(onSubmit); // Call handleSubmit from useForm with onSubmit callback
  };

  return (
    <div className={styles.formContainer}>
      <h2>Form Example</h2>   {/*Title of the form*/}
      <form onSubmit={handleFormSubmit}>
        {/*Name input field with validation error display*/}
        <div className={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={values.name}    //value of name field from useForm hook
            onChange={handleChange}   //onChange handler from useForm
            onBlur={handleBlur}    //onBlur handler from useForm
            className={errors.name && hasSubmitted ? styles.errorInput : ""}    //apply errorInput class if there is an error in name field and the form has been submitted
          />
            {/*Display error message if there is an error in the name field and the form has been submitted*/}
          {errors.name && hasSubmitted && (
            <span className={styles.error}>{errors.name}</span>
          )}
        </div>

        {/*Email input field with validation error display*/}
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={values.email}  //value of the email field from useForm hook
            onChange={handleChange}    //onChange handler from useForm
            onBlur={handleBlur} //onBlur handler from useForm
            className={errors.email && hasSubmitted ? styles.errorInput : ""}   //apply errorInput class if there is an error and form has been submitted
          />
            {/*Display error message if there is an error in email and hasSubmitted is true*/}
          {errors.email && hasSubmitted && (
            <span className={styles.error}>{errors.email}</span>
          )}
        </div>

        <div className={styles.actions}>   {/*container for action buttons: Submit and Reset*/}
          <button type="submit" className={styles.submitButton}> {/*Submit button*/}
            Submit
          </button>
          <button    // </div>*Reset button*
            type="button"  //set to button to prevent form submission
            onClick={() => {   //onClick calls reset function from useForm and sets hasSubmitted to false
              reset();
              setHasSubmitted(false); 
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

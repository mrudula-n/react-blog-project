import { useForm } from "../../hooks/useForm"; // Imports a custom hook for form management.
import { useState } from "react"; // Imports the useState hook for managing component state.
import styles from "./FormExample.module.css"; // Imports CSS styles specific to this component.

function FormExample() {
  const [hasSubmitted, setHasSubmitted] = useState(false); // State variable to track if the form has been submitted. Initialized to false.

  const validate = (values) => { // Validation function that takes form values as an argument.
    const errors = {}; // Object to store validation errors.  Starts empty.
    if (!values.name) {  //if name field is empty
      errors.name = "Name is required";  //sets the error message for name field
    } else if (values.name.length < 3) {  //if name is les than 3 characters
      errors.name = "Name must be at least 3 characters";  //sets the error message for name field
    }

    if (!values.email) {  //if email field is empty
      errors.email = "Email is required";  //sets the error message for email field
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) { // Regular expression to check for valid email format.
      errors.email = "Email is invalid";  //sets the error message for email field if it doesn't match the regex
    }

    return errors; // Returns the errors object. If empty, validation passed.
  };

  const {
    values, // An object containing the current values of the form fields.
    errors, // An object containing any validation errors.
    handleChange, // A function to handle changes in the form fields.
    handleBlur, // A function to handle blur events (when a field loses focus).
    handleSubmit, // A function to handle form submission.
    reset, // A function to reset the form to its initial values.
  } = useForm({ name: "", email: "" }, validate); 
  // Calls the custom useForm hook with initial values and the validation function.

  const onSubmit = async (formData) => {  // Callback function to be executed after successful form submission.
    // Save the form data to localStorage
    const existingData = JSON.parse(localStorage.getItem("formData")) || [];  // Retrieves existing form data from localStorage or initializes an empty array.
    const updatedData = [...existingData, formData];  // Adds the new form data to the existing data.
    localStorage.setItem("formData", JSON.stringify(updatedData)); // Stores the updated data in localStorage.

    alert(`Form Submitted and Saved to LocalStorage: ${JSON.stringify(formData)}`); // Displays an alert message with the submitted data.
    reset(); // Resets the form.
    setHasSubmitted(false); // Resets the submission state.
  };

  const handleFormSubmit = (e) => {  // Event handler function for form submission.
    e.preventDefault(); // Prevents the default form submission behavior.
    setHasSubmitted(true); // Sets hasSubmitted to true to trigger error display after submission attempt.  
    handleSubmit(onSubmit); // Calls the handleSubmit function from useForm to trigger validation and submission.  Passes the onSubmit function as a callback.
  };

  return (
    <div className={styles.formContainer}>
      <h2>Form Example</h2>
      <form onSubmit={handleFormSubmit}> {/* Form element with onSubmit handler. */}
        <div className={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={values.name}  //input value is set to values.name
            onChange={handleChange}  //onChange event is handled by handleChange function
            onBlur={handleBlur}   //onBlur event is handled by handleBlur function
            className={errors.name && hasSubmitted ? styles.errorInput : ""}  // Applies the errorInput class if there's a name error and the form has been submitted.
          />
          {errors.name && hasSubmitted && (  //display error message if there is an error for name field and the form has been submitted.
            <span className={styles.error}>{errors.name}</span>
          )}
        </div>

        {/* Similar structure for the email input field */}
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

        <div className={styles.actions}> {/*buttons container*/}
          <button type="submit" className={styles.submitButton}> {/*submit button*/}
            Submit
          </button>
          <button  
            type="button"
            onClick={() => {
              reset();  //reset form fields
              setHasSubmitted(false);  //set submitted to false
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

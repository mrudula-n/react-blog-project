import { useForm } from "../../hooks/useForm";
import styles from "./FormExample.module.css";

function FormExample() {
  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Name is required";
    } else if (values.name.length < 3) {
      errors.name = "Name must be at least 3 characters";
    }

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
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
    alert(`Form Submitted: ${JSON.stringify(formData)}`);
  };

  return (
    <div className={styles.formContainer}>
      <h2>Form Example</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(onSubmit);
        }}
      >
        <div className={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.name && <span className={styles.error}>{errors.name}</span>}
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
          />
          {errors.email && <span className={styles.error}>{errors.email}</span>}
        </div>

        <div className={styles.actions}>
          <button type="submit">Submit</button>
          <button type="button" onClick={reset}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormExample;

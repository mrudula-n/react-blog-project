import { useState, useCallback } from "react";

export function useForm(initialValues = {}, validate = () => ({})) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setValues((prev) => ({ ...prev, [name]: value }));

      // Clear the error for the field being modified
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    },
    [errors]
  );

  const handleBlur = useCallback(
    (e) => {
      const { name } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));

      // Validate field on blur
      const fieldErrors = validate({ [name]: values[name] });
      setErrors((prev) => ({ ...prev, ...fieldErrors }));
    },
    [values, validate]
  );

  const handleSubmit = useCallback(
    async (onSubmit) => {
      setIsSubmitting(true);

      // Validate all fields
      const formErrors = validate(values);
      setErrors(formErrors);

      if (Object.keys(formErrors).length === 0) {
        try {
          await onSubmit(values);
          setValues(initialValues); // Reset form values
          setTouched({});
        } catch (error) {
          setErrors((prev) => ({ ...prev, submit: error.message }));
        }
      }

      setIsSubmitting(false);
    },
    [values, validate, initialValues]
  );

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  // Validation helper for edge cases
  const enhancedValidate = useCallback(
    (fieldValues) => {
      const newErrors = {};

      for (const field in fieldValues) {
        const value = fieldValues[field];

        // Generic validation for empty fields
        if (!value?.trim()) {
          newErrors[field] = `${field} is required.`;
          continue;
        }

        // Specific validation for email fields
        if (
          field === "email" &&
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
        ) {
          newErrors[field] = "Invalid email address.";
          continue;
        }

        // Add additional field-specific validations as needed
      }

      return newErrors;
    },
    []
  );

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    validate: enhancedValidate,
  };
}

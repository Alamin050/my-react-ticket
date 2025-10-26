import { useState } from 'react';

export const useFormValidation = (fields) => {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    for (const key in fields) {
      const field = fields[key];
      if (field.required && !field.value) {
        newErrors[key] = 'This field is required';
      } else if (field.isEmail && !/\S+@\S+\.\S+/.test(field.value)) {
        newErrors[key] = 'Please enter a valid email address';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateField = (key) => {
    const field = fields[key];
    const newErrors = { ...errors };
    if (field.required && !field.value) {
      newErrors[key] = 'This field is required';
    } else if (field.isEmail && !/\S+@\S+\.\S+/.test(field.value)) {
      newErrors[key] = 'Please enter a valid email address';
    } else {
      delete newErrors[key];
    }
    setErrors(newErrors);
  };

  return { errors, validate, validateField };
};
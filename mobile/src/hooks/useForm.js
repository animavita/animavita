import { useState, useEffect, useCallback } from 'react';

const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const [disabled, setDisabled] = useState(true);

  const handleChange = (name, value) => {
    setValues(prevState => ({ ...prevState, [name]: value }));
    setDisabled(false);
  };

  const resetValues = useCallback(() => {
    setValues(initialValues);
  }, [initialValues]);

  useEffect(() => {
    resetValues();
  }, [initialValues, resetValues]);

  return [values, handleChange, resetValues, disabled];
};

export default useForm;

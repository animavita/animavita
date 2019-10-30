import { useState, useEffect } from 'react';

const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const [disabled, setDisabled] = useState(true);

  const handleSubmit = () => {
    // do Something
  };

  const handleChange = (name, value) => {
    setValues(prevState => ({ ...prevState, [name]: value }));
    setDisabled(false);
  };

  const resetValues = () => {
    setValues(initialValues);
  };

  useEffect(() => {
    resetValues();
  }, [initialValues]);

  return [values, handleChange, resetValues, disabled];
};

export default useForm;

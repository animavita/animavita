import { useState } from 'react';

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

  return [values, handleChange, handleSubmit, disabled];
};

export default useForm;

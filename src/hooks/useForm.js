import { useState } from 'react';

const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);

  const handleSubmit = () => {
    // do Something
  };

  const handleChange = (name, value) => {
    setValues(prevState => ({ ...prevState, [name]: value }));
  };

  return [values, handleChange, handleSubmit];
};

export default useForm;

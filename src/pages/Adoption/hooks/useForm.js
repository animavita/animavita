import { useState } from 'react';

const useForm = (initial) => {
  const [values, setValues] = useState(initial);

  const handleSubmit = () => {
    // do Something
  };

  const handleChange = (name, value) => {
    setValues(prevState => ({ ...prevState, [name]: value }));
  };

  return [values, handleChange, handleSubmit];
};

export default useForm;

import { useState } from 'react';
import { useMutation as useHookMutation } from '@apollo/react-hooks';

export function useMutation(mutation, { onCompleted, onError, ...options } = {}) {
  const [loading, setLoading] = useState(false);
  const [called, setCalled] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  alert(mutation);
  const mutate = useHookMutation(mutation, options);

  const handler = async (...args) => {
    setLoading(true);
    setCalled(true);
    setError(null);
    setData(null);

    try {
      const { data: newData } = await mutate(...args);

      setData(newData);

      setLoading(false);

      if (onCompleted) {
        onCompleted(newData);
      }

      return data;
    } catch (e) {
      setLoading(false);
      setError(e);

      if (onError) {
        onError(e);
      }
    }

    return data;
  };

  return [
    handler,
    {
      loading,
      called,
      error,
      data,
    },
  ];
}

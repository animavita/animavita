import { useEffect, useRef, useState } from 'react';

const useResendTimer = (initialSeconds = 60) => {
  const [timer, setTimer] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timer > 0) {
      timerRef.current = setTimeout(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [timer]);

  const startTimer = () => {
    setTimer(initialSeconds);
  };

  const resetTimer = () => {
    setTimer(0);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  const isActive = timer > 0;

  return {
    timer,
    isActive,
    startTimer,
    resetTimer,
  };
};

export default useResendTimer;

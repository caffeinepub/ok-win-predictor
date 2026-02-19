import { useState, useEffect, useRef } from 'react';

interface UseCountdownTimerOptions {
  initialSeconds?: number;
  onComplete?: () => void;
}

export function useCountdownTimer({ initialSeconds = 30, onComplete }: UseCountdownTimerOptions = {}) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const onCompleteRef = useRef(onComplete);

  // Keep the callback ref up to date
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          // Timer reached zero, trigger callback then reset
          if (onCompleteRef.current) {
            onCompleteRef.current();
          }
          return initialSeconds;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [initialSeconds]);

  return { seconds };
}

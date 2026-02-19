import { useState, useEffect } from 'react';

const STORAGE_KEY = 'predictionPeriodNumber';

export function usePeriodNumber() {
  const [periodNumber, setPeriodNumber] = useState<number>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? parseInt(stored, 10) : 1;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, periodNumber.toString());
  }, [periodNumber]);

  const increment = () => {
    setPeriodNumber((prev) => prev + 1);
  };

  return { periodNumber, increment };
}

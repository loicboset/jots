import { useEffect, useState } from 'react';

const useDebounce = <T>(value: T, delay = 500): T => {
  // STATE
  const [debouncedValue, setDebouncedValue] = useState(value);

  // HOOKS
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return (): void => {
        clearTimeout(handler);
      };
    },
    [value, delay], // Only re-call effect if value or delay changes
  );

  return debouncedValue;
};

export default useDebounce;

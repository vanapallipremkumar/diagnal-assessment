import { useEffect, useRef, useState } from "react";

function useDebounce(newValue: string, delay: number = 500) {
  const timeout = useRef<number>(-1);
  const [value, setValue] = useState(newValue);

  useEffect(() => {
    timeout.current = setTimeout(() => {
      setValue(newValue);
    }, delay);

    return () => {
      clearTimeout(timeout.current);
    };
  }, [newValue, delay]);

  return value;
}

export default useDebounce;

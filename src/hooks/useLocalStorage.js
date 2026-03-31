import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
  // 1. Get initial state from storage, or use default if empty
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  });

  // 2. Whenever 'value' changes, automatically save it to storage
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

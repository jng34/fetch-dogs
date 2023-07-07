import { useState } from "react";

interface User {
  name: string,
  email: string
}

export default function useLocalStorage(key: string, value: User | null) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const val = window.localStorage.getItem(key);
      if (val) {
        return JSON.parse(val);
      } else {
        window.localStorage.setItem(key, JSON.stringify(val));
        return val;
      }
    } catch (err) {
      console.log(err)
      return value;
    }
  });
  const setValue = (newValue: User) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(newValue));
    } catch (err) {}
    setStoredValue(newValue);
  };
  return [storedValue, setValue];
};
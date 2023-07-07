import { useState } from "react";

interface User {
  name: string,
  email: string
}

// Connects local storage with state objects

export default function useLocalStorage(key: string, value: User | null) {
  const [storedSession, setStoreSession] = useState(() => {
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

  const setSession = (key: string, newValue: User | null) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(newValue));
    } catch (err) {}
    setStoreSession(newValue);
  };

  const removeSession = () => {
    window.localStorage.removeItem(key)
  }

  return [storedSession, setSession, removeSession];
};
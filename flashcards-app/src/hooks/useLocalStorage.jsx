// src/hooks/useLocalStorage.js
import { useState, useEffect } from 'react';

/**
 * Custom hook để quản lý localStorage với React state
 * @param {string} key - Key để lưu trữ trong localStorage
 * @param {any} initialValue - Giá trị mặc định
 * @returns {[any, function]} - [value, setValue]
 */
export const useLocalStorage = (key, initialValue) => {
  // State để lưu trữ giá trị hiện tại
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Lấy giá trị từ localStorage
      const item = window.localStorage.getItem(key);
      // Parse JSON hoặc trả về initialValue nếu không có
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Nếu có lỗi, trả về initialValue
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Hàm để set giá trị mới
  const setValue = (value) => {
    try {
      // Cho phép value là một function như useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Lưu vào state
      setStoredValue(valueToStore);
      
      // Lưu vào localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // Xử lý lỗi khi write localStorage
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Xóa item khỏi localStorage
  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue, removeValue];
};

/**
 * Hook để sync localStorage giữa các tabs
 * @param {string} key - Key để lưu trữ
 * @param {any} initialValue - Giá trị mặc định
 * @returns {[any, function]} - [value, setValue]
 */
export const useLocalStorageSync = (key, initialValue) => {
  const [storedValue, setStoredValue] = useLocalStorage(key, initialValue);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.error('Error syncing localStorage:', error);
        }
      }
    };

    // Listen cho storage events
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key, setStoredValue]);

  return [storedValue, setStoredValue];
};

/**
 * Hook để quản lý localStorage với validation
 * @param {string} key - Key để lưu trữ
 * @param {any} initialValue - Giá trị mặc định
 * @param {function} validator - Hàm validation
 * @returns {[any, function, boolean]} - [value, setValue, isValid]
 */
export const useValidatedLocalStorage = (key, initialValue, validator) => {
  const [storedValue, setValue] = useLocalStorage(key, initialValue);
  const [isValid, setIsValid] = useState(true);

  const setValidatedValue = (value) => {
    try {
      const isValueValid = validator ? validator(value) : true;
      setIsValid(isValueValid);
      
      if (isValueValid) {
        setValue(value);
      }
    } catch (error) {
      console.error('Validation error:', error);
      setIsValid(false);
    }
  };

  return [storedValue, setValidatedValue, isValid];
};
import React, { useState, useEffect } from "react";
import { useLocalStorage } from "react-use";
import constate from "constate";

const storageValueKey = "count";

const useCounter = ({ initialState = 0 }) => {
  const [
    storageValue,
    setStorageValue,
    removeStorageValue,
  ] = useLocalStorage(storageValueKey, initialState, { raw: true });

  const [count, setCount] = useState(
    () => parseInt(storageValue) || initialState
  );

  // 保存到 localStorage
  useEffect(() => {
    console.log("useEffect count = ", count);
    setStorageValue(count);
  }, [setStorageValue, count]);

  const reset = () => setCount(initialState);
  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);

  return { count, reset, increment, decrement, removeStorageValue };
};

export const [CounterProvider, useCounterContext] = constate(useCounter);

import React, { useState, createContext, useContext } from "react";

const useCounter = (initialState = 0) => {
  const [count, setCount] = useState(initialState);

  const reset = () => setCount(initialState);
  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);

  return { count, reset, increment, decrement };
};

const Counter = createContext();

export const CounterProvider = ({ children }) => {
  const value = useCounter();
  return <Counter.Provider value={value}>{children}</Counter.Provider>;
};

export const useCounterContext = () => useContext(Counter);

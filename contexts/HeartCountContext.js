import React, { createContext, useState, useContext } from "react";

// Create the HeartCount Context
const HeartCountContext = createContext();

// HeartCountProvider component to provide the context value to its children
export const HeartCountProvider = ({ children }) => {
  const [heartCount, setHeartCount] = useState(0);

  const incrementHeartCount = (change) => {
    setHeartCount((prevCount) => prevCount + change);
  };

  return (
    <HeartCountContext.Provider value={{ heartCount, incrementHeartCount }}>
      {children}
    </HeartCountContext.Provider>
  );
};

// Custom hook to use the HeartCountContext in any component
export const useHeartCount = () => {
  return useContext(HeartCountContext);
};

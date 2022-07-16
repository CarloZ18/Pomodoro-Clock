import { useState } from "react";

const useRunning = (initialValue) => {
  const [isRunning, setRunning] = useState(initialValue);
  const changeRunning = () => {
    setRunning(!isRunning);
  };
  const resetRunning = () => {
    setRunning(false);
  };
  return [isRunning, changeRunning, resetRunning];
};

export default useRunning;

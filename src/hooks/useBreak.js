import { useState } from "react";

const useBreak = (initialState) => {
  const [breakLength, setBreakLength] = useState(initialState);

  const incrementBreak = () => {
    setBreakLength(breakLength + 1);
  };

  const decrementBreak = () => {
    setBreakLength(breakLength - 1);
  };

  const resetBreak = () => {
    setBreakLength(initialState);
  };
  return [breakLength, incrementBreak, decrementBreak, resetBreak];
};

export default useBreak;

import { useState } from "react";

const useNameTimer = (initialState) => {
  const [nameTimer, setNameTimer] = useState(initialState);
  const changeNameTimer = () => {
    nameTimer === initialState
      ? setNameTimer("Break")
      : setNameTimer(initialState);
  };
  const resetNameTimer = () => {
    setNameTimer(initialState);
  };
  return [nameTimer, changeNameTimer, resetNameTimer];
};

export default useNameTimer;

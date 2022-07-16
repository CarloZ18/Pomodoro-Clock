import { useState } from "react";

const useSession = (initialState) => {
  const [sessionLength, setSessionLength] = useState(initialState);

  const incrementSession = () => {
    setSessionLength(sessionLength + 1);
  };

  const decrementSession = () => {
    setSessionLength(sessionLength - 1);
  };

  const resetSession = () => {
    setSessionLength(initialState);
  };
  return [sessionLength, incrementSession, decrementSession, resetSession];
};

export default useSession;

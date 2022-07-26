import { useState } from "react";

const useTimer = (initialTime) => {
  const [timer, setTimer] = useState(initialTime);
  return [timer, setTimer];
};

export default useTimer;

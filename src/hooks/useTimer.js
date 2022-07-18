import { useState } from "react";

const useTimer = (initialTime) => {
  const [timer, setTimer] = useState(initialTime);
console.log(timer);
  return [timer, setTimer];
};

export default useTimer;

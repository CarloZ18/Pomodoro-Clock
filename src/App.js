import { useState } from "react";
import Adjust from "./Component/Adjust";
import Clock from "./Component/Clock";
import Controls from "./Component/Controls";

function App() {
  const [numBreak, setNumBreak] = useState(5);
  const [min, setMin] = useState(25);
  const [sec, setSec] = useState(0);

  const changeFormat = (min, sec) => {
    let minutes = min;
    let seconds = sec;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return minutes + ":" + seconds;
  };

  const increaseBreak = () => {
    setNumBreak(numBreak + 1);
};
  const decreaseBreak = () => {
    if(numBreak > 1){
     setNumBreak(numBreak - 1); 
    }
  };

  const increaseSession = () => {
    setMin(min + 1);
  }

  const decreaseSession = () => {
    if(min > 1){
     setMin(min - 1); 
    }
  }

  return (
    <div id="pomodoro-clock">
      <h1>Excercises Timer</h1>
      <Adjust
        numBreak={numBreak}
        numSession={min}
        increaseBreak={increaseBreak}
        decreaseBreak={decreaseBreak}
        increaseSession={increaseSession}
        decreaseSession={decreaseSession}
      />
      <Clock count={changeFormat(min, sec)} />
      <Controls/>
    </div>
  );
}

export default App;

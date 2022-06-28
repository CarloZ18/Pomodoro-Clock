import { useRef, useState, useEffect } from "react";
import Adjust from "./Component/Adjust";
import Clock from "./Component/Clock";
import Controls from "./Component/Controls";
import { faPlay, faPause } from "@fortawesome//free-solid-svg-icons";
import $ from "jquery";

function App() {
  const [numBreak, setNumBreak] = useState(5);
  const [numSession, setNumSession] = useState(25);
  const [timer, setTimer] = useState(1500);

  //ADJUST FUNCTIONS
  const changeFormat = (timer) => {
    let minutes = Math.floor(timer / 60);
    let seconds = timer - minutes * 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return minutes + ":" + seconds;
  };

  const increaseBreak = () => {
    if (isRunning === false) {
      setNumBreak(numBreak + 1);
    }
  };
  const decreaseBreak = () => {
    if (isRunning === false) {
      if (numBreak > 1) {
        setNumBreak(numBreak - 1);
      }
    }
  };

  const increaseSession = () => {
    if (isRunning === false) {
      setNumSession(numSession + 1);
      setTimer((numSession + 1) * 60);
    }
  };

  const decreaseSession = () => {
    if (isRunning === false) {
      if (numSession > 1) {
        setNumSession(numSession - 1);
        setTimer((numSession - 1) * 60);
      }
    }
  };

  //CLOCK FUNCTIONS
const [nameTimer, setNameTimer] = useState("Session");

  //CONTROLS FUNCTIONS
  const [isRunning, setIsRunning] = useState(false);
  const playPause = useRef();
  const [changeIcon, setChangeIcon] = useState(faPlay);

  const decreaseTimer = () => {
    setTimer(timer - 1);
  };

  useEffect(() => {
    if (isRunning === true) {
      const interval = setInterval(() => {
        decreaseTimer();
      }, 1000);
      if (timer === 0) {
        //AUDIO EFFECT
        setTimer(numBreak * 60);
        setNameTimer("Break");
        if (timer === 0) {
          setTimer(numSession * 60);
        }
      }
      return () => clearInterval(interval);
    }
  })
  const startStop = () => {
    if (isRunning === false) {
      setChangeIcon(faPause);
      setIsRunning(true);
    } else {
      setChangeIcon(faPlay);
      setIsRunning(false);
    }
  };

  const reset = () => {
    setTimer(1500);
    setNumSession(25);
    setNumBreak(5);
    setIsRunning(false);
    setChangeIcon(faPlay);
    setNameTimer("Session");
  };

  return (
    <div id="pomodoro-clock">
      <h1 id="title">Excercises Timer</h1>
      <Adjust
        numBreak={numBreak}
        numSession={numSession}
        increaseBreak={increaseBreak}
        decreaseBreak={decreaseBreak}
        increaseSession={increaseSession}
        decreaseSession={decreaseSession}
      />
      <Clock count={changeFormat(timer)} nameTimer={nameTimer} />
      <Controls
        startStop={startStop}
        reset={reset}
        playPause={playPause}
        changeIcon={changeIcon}
      />
    </div>
  );
}

export default App;

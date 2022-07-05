import { useRef, useState, useEffect } from "react";
import Adjust from "./Component/Adjust";
import Clock from "./Component/Clock";
import Controls from "./Component/Controls";
import { faPlay, faPause } from "@fortawesome//free-solid-svg-icons";


function App() {
  //STATES
  const [numBreak, setNumBreak] = useState(5);
  const [numSession, setNumSession] = useState(25);
  const [timer, setTimer] = useState(1500);
  const [nameTimer, setNameTimer] = useState("Session");
  const [isRunning, setIsRunning] = useState(false);
  const [changeIcon, setChangeIcon] = useState(faPlay);
  const [intervalID, setIntervalID] = useState(0);
  //REFS
  const refAudio = useRef();

  const changeFormat = () => {
    let minutes = Math.floor(timer / 60);
    let seconds = timer - minutes * 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return minutes + ":" + seconds;
  };
  console.log(changeFormat(timer));

  const breakHandler = (e) => {
    if (isRunning === false) {
      if (e.currentTarget.id === "break-increment" && numBreak < 60) {
        setNumBreak(numBreak + 1);
        if (nameTimer === "Break") {
          setTimer((numBreak + 1) * 60);
        }
      } else if (e.currentTarget.id === "break-decrement" && numBreak > 1) {
        setNumBreak(numBreak - 1);
        if (nameTimer === "Break") {
          setTimer((numBreak - 1) * 60);
        }
      }
    }
    return;
  };

  const sessionHandler = (e) => {
    if (isRunning === false) {
      if (e.currentTarget.id === "session-increment" && numSession < 60) {
        setNumSession(numSession + 1);
        if (nameTimer === "Session") {
          setTimer((numSession + 1) * 60);
        }
      } else if (
        e.currentTarget.id === "session-decrement" &&
        numSession > 1
      ) {
        setNumSession(numSession - 1);
        if (nameTimer === "Session") {
          setTimer((numSession - 1) * 60);
        }
      }
    }
    return;
  };

  const decreaseTimer = () => {
    if (timer > 0) {
      setTimer(timer - 1);
    } else if (timer === 0 && nameTimer === "Session") {
      refAudio.current.play();
      nameTimer === "Session" ? setNameTimer("Break") : setNameTimer("Session");
      setTimer(nameTimer === "Session" ? numBreak * 60 : numSession * 60);
    }
  };

  useEffect(() => {
    if (isRunning === true) {
      const interval = setInterval(() => {
        decreaseTimer();
        setIntervalID((seconds) => seconds + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  },[intervalID, isRunning, nameTimer, numBreak, numSession, timer]);

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
    clearInterval(intervalID);
    refAudio.current.pause();
    refAudio.current.currentTime = 0;
  };

  return (
    <div id="pomodoro-clock">
      <h1 id="title">Excercises Timer</h1>
      <Adjust
        numBreak={numBreak}
        numSession={numSession}
        breakHandler={breakHandler}
        sessionHandler={sessionHandler}
      />
      <Clock count={changeFormat()} nameTimer={nameTimer} />

      <Controls startStop={startStop} reset={reset} changeIcon={changeIcon} />
      <audio
        id="beep"
        ref={refAudio}
        preload="auto"
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      ></audio>
    </div>
  );
}

export default App;

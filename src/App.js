import { useRef, useState, useEffect } from "react";
import Adjust from "./Component/Adjust";
import Clock from "./Component/Clock";
import Controls from "./Component/Controls";
import { faPlay, faPause } from "@fortawesome//free-solid-svg-icons";

function App() {
  const [numBreak, setNumBreak] = useState(5);
  const [numSession, setNumSession] = useState(25);
  const [timer, setTimer] = useState(1500);

  //ADJUST FUNCTIONS
  const changeFormat = () => {
    let minutes = Math.floor(timer / 60);
    let seconds = timer - minutes * 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return minutes + ":" + seconds;
  };

  const breakHandler = (e) => {
    if (isRunning === false) {
      if (e.currentTarget.id === "break-increment" && numBreak < 60) {
        setNumBreak(numBreak + 1);
        if (nameTimer === "Break") {
          setTimer(numBreak * 60 + 60);
        }
      } else if (e.currentTarget.id === "break-decrement" && numBreak > 1) {
        setNumBreak(numBreak - 1);
        if (nameTimer === "Break") {
          setTimer(numBreak * 60 - 60);
        }
      }
    }
  };

  const sessionHandler = (e) => {
    if (isRunning === false) {
      if (e.currentTarget.id === "session-increment" && numSession < 60) {
        setNumSession(numSession + 1);
        if (nameTimer === "Session") {
          setTimer(numSession * 60 + 60);
        }
      } else if (e.currentTarget.id === "session-decrement" && numSession > 1) {
        setNumSession(numSession - 1);
        if (nameTimer === "Session") {
          setTimer(numSession * 60 - 60);
        }
      }
    }
  };

  //CLOCK FUNCTIONS
  const [nameTimer, setNameTimer] = useState("Session");

  //CONTROLS FUNCTIONS
  const [isRunning, setIsRunning] = useState(false);
  const playPause = useRef();
  const [changeIcon, setChangeIcon] = useState(faPlay);
  const refAudio = useRef();

  const decreaseTimer = () => {
    setTimer(timer - 1);
  };

  const intervalController = () => {
    if (timer < 0) {
      if (nameTimer === "Session") {
        refAudio.current.play();
        setTimer(numBreak * 60);
        setNameTimer("Break");
      } else {
        refAudio.current.play();
        setTimer(numSession * 60);
        setNameTimer("Session");
      }
    }
  };

  useEffect(() => {
    if (isRunning === true) {
      const interval = setInterval(() => {
        decreaseTimer();
        intervalController();
      }, 1000);
      return () => clearInterval(interval);
    }
  });

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
    refAudio.current.pause();
    refAudio.current.currentTime = 0;
  };
  console.log(changeFormat());
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

      <Controls
        startStop={startStop}
        reset={reset}
        playPause={playPause}
        changeIcon={changeIcon}
      />
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

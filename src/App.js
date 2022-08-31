import { useEffect, useRef, useState } from "react";
import {
  faArrowDown,
  faArrowUp,
  faPause,
  faPlay,
  faRefresh,
} from "@fortawesome//free-solid-svg-icons";
import Adjust from "./Component/Adjust";
import Clock from "./Component/Clock";
import Controls from "./Component/Controls";
import { useDispatch, useSelector } from "react-redux";

import {
  start,
  stop,
  resetAll,
  incrementBreak,
  incrementSession,
  decrementBreak,
  decrementSession,
  changeTimerB,
  changeTimerS,
  decrementTimer,
} from "./store/amount/reducer";

function App() {
  const dispatch = useDispatch();

  const nameTimer = useSelector((state) => state.nameTimer);
  const isRunning = useSelector((state) => state.isRunning);
  const breakLength = useSelector((state) => state.breakLength);
  const sessionLength = useSelector((state) => state.sessionLength);
  const timer = useSelector((state) => state.timer);

  const [intervalId, setIntervalId] = useState(0);
  const [icon, setIcon] = useState(faPlay);

  const changeFormat = () => {
    let minutes = Math.floor(timer / 60);
    let seconds = timer - minutes * 60;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return `${minutes}:${seconds}`;
  };
  //REFS
  const refAudio = useRef();
  const timerRef = useRef();
  const labelRef = useRef();

  const breakHandler = (e) => {
    console.log(breakLength);
    if (e.currentTarget.value === "+" && isRunning === false) {
      dispatch(incrementBreak());
    } else if (e.currentTarget.value === "-" && isRunning === false) {
      dispatch(decrementBreak());
    }
  };

  const sessionHandler = (e) => {
    if (e.currentTarget.value === "+" && isRunning === false) {
      dispatch(incrementSession());
    } else if (e.currentTarget.value === "-" && isRunning === false) {
      dispatch(decrementSession());
    }
  };

  const startStop = () => {
    if (isRunning === true) {
      dispatch(stop());
      setIcon(faPlay);
      clearInterval(intervalId);
      setIntervalId(intervalId);
      return;
    } else {
      setIntervalId(
        setInterval(() => {
          dispatch(decrementTimer());
        }, 1000)
      );
      dispatch(start());
      setIcon(faPause);
    }
  };

  const reset = () => {
    clearInterval(intervalId);
    setIntervalId(0);
    dispatch(resetAll());
    setIcon(faPlay);
    refAudio.current.pause();
    refAudio.current.currentTime = 0;
    timerRef.current.style.color = "white";
    labelRef.current.style.color = "white";
  };
  const changeTimer = () => {
    if (timer < 0 && nameTimer === "Session") {
      refAudio.current.play();
      dispatch(changeTimerB());
    } else if (timer < 0 && nameTimer === "Break") {
      refAudio.current.play();
      dispatch(changeTimerS());
    }
  };

  const controlColorTimer = () => {
    if (timer < 60) {
      timerRef.current.style.color = "red";
      labelRef.current.style.color = "red";
    } else {
      timerRef.current.style.color = "white";
      labelRef.current.style.color = "white";
    }
  };

  useEffect(() => {
    changeTimer();
    controlColorTimer();
  }, [timer]);

  return (
    <div id="pomodoro-clock">
      <h1 id="title">Excercises Timer</h1>
      <Adjust
        breakLength={breakLength}
        sessionLength={sessionLength}
        breakHandler={breakHandler}
        sessionHandler={sessionHandler}
        faArrowDown={faArrowDown}
        faArrowUp={faArrowUp}
      />

      <Clock
        count={changeFormat()}
        nameTimer={nameTimer}
        timerRef={timerRef}
        labelRef={labelRef}
      />

      <Controls
        startStop={startStop}
        reset={reset}
        icon={icon}
        faRefresh={faRefresh}
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

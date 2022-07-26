import { memo, useEffect, useRef, useState } from "react";
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
import useBreak from "./hooks/useBreak";
import useSession from "./hooks/useSession";
import useNameTimer from "./hooks/useNameTimer";
import useRunning from "./hooks/useRunning";
import { useInterval } from "usehooks-ts";

function App() {
  //CUSTOM HOOKS
  /* const [isRunning, changeRunning, resetRunning] = useRunning(false);
  const [breakLength, incrementBreak, decrementBreak, resetBreak] = useBreak(5);
  const [sessionLength, incrementSession, decrementSession, resetSession] =
    useSession(25);
  const [nameTimer, changeNameTimer, resetNameTimer] = useNameTimer("Session");*/

  //STATES
  const [icon, setIcon] = useState(faPlay);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [intervalId, setIntervalId] = useState(0);
  const [nameTimer, setNameTimer] = useState("Session");
  const [isRunning, setIsRunning] = useState(false);
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);

  let zeroMinutes = minutes < 10 ? "0" + minutes : minutes;
  let zeroSecond = seconds < 10 ? "0" + seconds : seconds;

  //REFS
  const refAudio = useRef();
  const timerRef = useRef();
  const labelRef = useRef();

  const breakHandler = (e) => {
    if (
      isRunning === false &&
      e.currentTarget.id === "break-increment" &&
      breakLength < 60
    ) {
      setBreakLength(breakLength + 1);
      nameTimer === "Break" ? setMinutes(breakLength + 1) : setMinutes(minutes);

      nameTimer === "Break" ? setSeconds(0) : setSeconds(seconds);
    } else if (
      isRunning === false &&
      e.currentTarget.id === "break-decrement" &&
      breakLength > 1
    ) {
      setBreakLength(breakLength - 1);
      nameTimer === "Break" ? setMinutes(breakLength - 1) : setMinutes(minutes);

      nameTimer === "Break" ? setSeconds(0) : setSeconds(seconds);
    }
  };

  const sessionHandler = (e) => {
    if (
      isRunning === false &&
      e.currentTarget.id === "session-increment" &&
      sessionLength < 60
    ) {
      setSessionLength(sessionLength + 1);
      nameTimer === "Session"
        ? setMinutes(sessionLength + 1)
        : setMinutes(minutes);

      nameTimer === "Session" ? setSeconds(0) : setSeconds(seconds);
    } else if (
      isRunning === false &&
      e.currentTarget.id === "session-decrement" &&
      sessionLength > 1
    ) {
      setSessionLength(sessionLength - 1);
      nameTimer === "Session"
        ? setMinutes(sessionLength - 1)
        : setMinutes(minutes);

      nameTimer === "Session" ? setSeconds(0) : setSeconds(seconds);
    }
  };

  const changeTimer = () => {
    if (nameTimer === "Session") {
      setMinutes(breakLength);
      setSeconds(0);
      setNameTimer("Break");
    } else {
      setMinutes(sessionLength);
      setSeconds(0);
      setNameTimer("Session");
    }
  };

  const decreaseTimer = () => {
    if (minutes === 0 && seconds === 0) {
      refAudio.current.play();
      changeTimer();
    } else if (seconds > 0) {
      setSeconds(seconds - 1);
    } else {
      setMinutes(minutes - 1);
      setSeconds(59);
    }
    setIntervalId(intervalId + 1);
  };

  useInterval(
    () => {
      decreaseTimer();
    },
    isRunning ? 1000 : null
  );

  const startStop = () => {
    if (isRunning === false) {
      setIsRunning(true);
      setIcon(faPause);
    } else {
      setIsRunning(false);
      setIcon(faPlay);
    }
  };
  const resetAll = () => {
    setMinutes(25);
    setSeconds(0);
    setIcon(faPlay);
    setIsRunning(false);
    setSessionLength(25);
    setBreakLength(5);
    setNameTimer("Session");
    setIntervalId(0);
    refAudio.current.pause();
    refAudio.current.currentTime = 0;
    timerRef.current.style.color = "white";
    labelRef.current.style.color = "white";
  };

  useEffect(() => {
    if (minutes === 0 && seconds <= 59) {
      timerRef.current.style.color = "red";
      labelRef.current.style.color = "red";
    } else {
      timerRef.current.style.color = "white";
      labelRef.current.style.color = "white";
    }
  }, [minutes, seconds]);

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
        count={`${zeroMinutes}:${zeroSecond}`}
        nameTimer={nameTimer}
        timerRef={timerRef}
        labelRef={labelRef}
      />

      <Controls
        startStop={startStop}
        reset={resetAll}
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

/*const mapStateToProps = (state) => {
  return {
    state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    start: () => dispatch(start()),
    stop: () => dispatch(stop()),
    resetAll: () => dispatch(resetAll()),
  };
};*/

/*export default connect(mapStateToProps, mapDispatchToProps)(App);*/

export default memo(App);

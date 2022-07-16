import { useRef, useEffect } from "react";
import Adjust from "./Component/Adjust";
import Clock from "./Component/Clock";
import Controls from "./Component/Controls";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  start,
  stop,
  resetAll,
  incrementInterval,
} from ".//store/amount/reducer";
import useBreak from "./hooks/useBreak";
import useSession from "./hooks/useSession";
import useNameTimer from "./hooks/useNameTimer";
import useRunning from "./hooks/useRunning";
import useTimer from "./hooks/useTimer";

function App() {
  const dispatch = useDispatch();
  const icon = useSelector((state) => state.clock.icon);

  //CUSTOM HOOKS
  const [timer, setTimer] = useTimer(1500);
  const [isRunning, changeRunning, resetRunning] = useRunning(false);
  const [breakLength, incrementBreak, decrementBreak, resetBreak] = useBreak(5);
  const [sessionLength, incrementSession, decrementSession, resetSession] =
    useSession(25);
  const [nameTimer, changeNameTimer, resetNameTimer] = useNameTimer("Session");

  //REFS
  const refAudio = useRef();
  const timerRef = useRef();
  const labelRef = useRef();

  const changeFormat = () => {
    let minutes = Math.floor(timer / 60);
    let seconds = timer - minutes * 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return minutes + ":" + seconds;
  };

  const breakHandler = (e) => {
    if (
      isRunning === false &&
      e.currentTarget.id === "break-increment" &&
      breakLength < 60
    ) {
      incrementBreak();
      nameTimer === "Break"
        ? setTimer((breakLength + 1) * 60)
        : setTimer(timer);
    } else if (
      isRunning === false &&
      e.currentTarget.id === "break-decrement" &&
      breakLength > 1
    ) {
      decrementBreak();
      nameTimer === "Break"
        ? setTimer((breakLength - 1) * 60)
        : setTimer(timer);
    }
  };

  const sessionHandler = (e) => {
    if (
      isRunning === false &&
      e.currentTarget.id === "session-increment" &&
      sessionLength < 60
    ) {
      incrementSession();
      nameTimer === "Session"
        ? setTimer((sessionLength + 1) * 60)
        : setTimer(timer);
    } else if (
      isRunning === false &&
      e.currentTarget.id === "session-decrement" &&
      sessionLength > 1
    ) {
      decrementSession();
      nameTimer === "Session"
        ? setTimer((sessionLength - 1) * 60)
        : setTimer(timer);
    }
  };

  const decreaseTimer = () => {
    if (timer > 0) {
      setTimer(timer - 1);
    } else if (timer === 0) {
      refAudio.current.play();
      changeNameTimer();

      nameTimer === "Session"
        ? setTimer(breakLength * 60)
        : setTimer(sessionLength * 60);
      timerRef.current.style.color = "white";
      labelRef.current.style.color = "white";
    }
  };

  useEffect(() => {
    if (isRunning === true) {
      if (timer < 60) {
        timerRef.current.style.color = "red";
        labelRef.current.style.color = "red";
      }
      const interval = setInterval(() => {
        decreaseTimer();
        dispatch(incrementInterval());
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning, timer]);

  const startStop = () => {
    if (isRunning === false) {
      dispatch(start());
      changeRunning(true);
    } else {
      dispatch(stop());
      changeRunning(false);
    }
  };

  const reset = () => {
    setTimer(1500);
    dispatch(resetAll());
    resetRunning();
    resetNameTimer();
    resetSession();
    resetBreak();
    refAudio.current.pause();
    refAudio.current.currentTime = 0;
    timerRef.current.style.color = "white";
    labelRef.current.style.color = "white";
  };

  return (
    <div id="pomodoro-clock">
      <h1 id="title">Excercises Timer</h1>
      <Adjust
        breakLength={breakLength}
        sessionLength={sessionLength}
        breakHandler={breakHandler}
        sessionHandler={sessionHandler}
      />
      <Clock
        count={changeFormat()}
        nameTimer={nameTimer}
        timerRef={timerRef}
        labelRef={labelRef}
      />

      <Controls startStop={startStop} reset={reset} changeIcon={icon} />
      <audio
        id="beep"
        ref={refAudio}
        preload="auto"
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      ></audio>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    start: () => dispatch(start()),
    stop: () => dispatch(stop()),
    resetAll: () => dispatch(resetAll()),
    incrementInterval: () => dispatch(incrementInterval()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

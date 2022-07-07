import { useRef, useEffect, useState } from "react";
import Adjust from "./Component/Adjust";
import Clock from "./Component/Clock";
import Controls from "./Component/Controls";
import { connect, useDispatch } from "react-redux";
import { store } from "./store/store";
import {
  breakIncrement,
  breakDecrement,
  sessionIncrement,
  sessionDecrement,
  nameTimerSession,
  nameTimerBreak,
  intervalID,
  start,
  stop,
  resetAll,
} from "./store/amount/action";

function App() {
  const dispatch = useDispatch();
  const state = store.getState();
  const [timer, setTimer] = useState(1500);

  //REFS
  const refAudio = useRef();

  const changeFormat = () => {
    let minutes = Math.floor(timer / 60);
    let seconds = timer - minutes * 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return minutes + ":" + seconds;
  };

  const breakHandler = (e) => {
    if (state.isRunning === false) {
      if (e.currentTarget.id === "break-increment" && state.break < 60) {
        dispatch(breakIncrement());

        if (state.nameTimer === "Break") {
          setTimer((state.break + 1) * 60);
        }
      } else if (e.currentTarget.id === "break-decrement" && state.break > 1) {
        dispatch(breakDecrement());
        if (state.nameTimer === "Break") {
          setTimer((state.break - 1) * 60);
        }
      }
    }
  };

  const sessionHandler = (e) => {
    if (state.isRunning === false) {
      if (e.currentTarget.id === "session-increment" && state.session < 60) {
        dispatch(sessionIncrement());
        if (state.nameTimer === "Session") {
          setTimer((state.session + 1) * 60);
        }
      } else if (
        e.currentTarget.id === "session-decrement" &&
        state.session > 1
      ) {
        dispatch(sessionDecrement());
        if (state.nameTimer === "Session") {
          setTimer((state.session - 1) * 60);
        }
      }
    }
  };

  const decreaseTimer = () => {
    if (timer > 0) {
      setTimer(timer - 1);
    } else if (timer === 0) {
      refAudio.current.play();
      state.nameTimer === "Session"
        ? dispatch(nameTimerBreak())
        : dispatch(nameTimerSession());

      state.nameTimer === "Session"
        ? setTimer(state.break * 60)
        : setTimer(state.session * 60);
    }
  };

  useEffect(() => {
    if (state.isRunning === true) {
      const interval = setInterval(() => {
        decreaseTimer();
        dispatch(intervalID());
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [state.isRunning, state.intervalID]);

  const startStop = () => {
    if (state.isRunning === false) {
     dispatch(start())
    } else {
      dispatch(stop())
    }
  };

  const reset = () => {
    setTimer(1500);
    dispatch(resetAll());
    refAudio.current.pause();
    refAudio.current.currentTime = 0;
  };

  console.log(state.session);
  return (
    <div id="pomodoro-clock">
      <h1 id="title">Excercises Timer</h1>
      <Adjust
        numBreak={state.break}
        numSession={state.session}
        breakHandler={breakHandler}
        sessionHandler={sessionHandler}
      />
      <Clock count={changeFormat()} nameTimer={state.nameTimer} />

      <Controls
        startStop={startStop}
        reset={reset}
        changeIcon={state.changeIcon}
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

const mapStateToProps = (state) => {
  return {
    break: state.break,
    session: state.session,
    isRunning: state.isRunning,
    nameTimer: state.nameTimer,
    changeIcon: state.changeIcon,
    intervalID: state.intervalID,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    breakIncrement: () => {
      dispatch(breakIncrement());
    },
    breakDecrement: () => {
      dispatch(breakDecrement());
    },
    sessionIncrement: () => {
      dispatch(sessionIncrement());
    },
    sessionDecrement: () => {
      dispatch(sessionDecrement());
    },
    nameTimerSession: () => {
      dispatch(nameTimerSession());
    },
    nameTimerBreak: () => {
      dispatch(nameTimerBreak());
    },
    intervalID: () => {
      dispatch(intervalID());
    },
    start: () => {
      dispatch(start());
    },
    stop: () => {
      dispatch(stop());
    },
    resetAll: () => {
      dispatch(resetAll());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

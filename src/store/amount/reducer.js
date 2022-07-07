import { faPause, faPlay } from "@fortawesome//free-solid-svg-icons";

const estadoInicial = {
  break: 5,
  intervalID:0,
  session: 25,
  nameTime: "Session",
  icon: faPlay,
  reset: false
};

const breakReducer = (state= estadoInicial.break, action) => {
  switch (action.type) {
    case "BREAK_INCREMENT":
      return state + action.payload;

    case "BREAK_DECREMENT":
      return state - action.payload;
      case "RESET":
      return 5;
    default:
      return state;
  }
};

const sessionReducer = (state = estadoInicial.session, action) => {
  switch (action.type) {
    case "SESSION_INCREMENT":
      return state + action.payload;

    case "SESSION_DECREMENT":
      return state - action.payload;
    case "RESET":
      return 25;
    default:
      return state;
  }
};

const isRunningReducer = (state = estadoInicial.reset, action) => {
  switch (action.type) {
    case "START":
      return true;
    case "STOP":
      return false;
    case "RESET":
      return false;
    default:
      return state;
  }
};

const nameTimerReducer = (state = estadoInicial.nameTime, action) => {
  switch (action.type) {
    case "NAME_TIMER_SESSION":
      return "Session";
    case "NAME_TIMER_BREAK":
      return "Break";
    case "RESET":
      return "Session";
    default:
      return state;
  }
};

const intervalIDReducer = (state = estadoInicial.intervalID, action) => {
  switch (action.type) {
    case "INTERVAL_ID":
      return state + 1;
    case "RESET":
      return 0;
    default:
      return state;
  }
};

const changeIconReducer = (state = estadoInicial.icon, action) => {
  switch (action.type) {
    case "STOP":
      return faPlay;
    case "START":
      return faPause;
    case "RESET":
      return faPlay;
    default:
      return state;
  }
};

export {
  breakReducer,
  sessionReducer,
  isRunningReducer,
  nameTimerReducer,
  intervalIDReducer,
  changeIconReducer,
};

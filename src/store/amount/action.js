
const breakIncrement = () => {
    return {
        type: "BREAK_INCREMENT",
        payload: 1,
    };
};

const breakDecrement = () => {
  return {
    type: "BREAK_DECREMENT",
    payload: 1,
  };
}

const sessionIncrement = () => {
  return {
    type: "SESSION_INCREMENT",
    payload: 1,
  };
};

const sessionDecrement = () => {
  return {
    type: "SESSION_DECREMENT",
    payload: 1,
  };
}


const nameTimerSession = () => {
  return {
    type: "NAME_TIMER_SESSION",
    payload: "Session",
  };
};

const nameTimerBreak = () => {
  return {
    type: "NAME_TIMER_BREAK",
    payload: "Break",
  };
}

const intervalID = () => {
  return {
    type: "INTERVAL_ID",
    payload: 0,
  };
};


const start = () => {
    return {
        type: "START",
        payload: true,
    };
}

const stop = () => {
    return {
        type: "STOP",
        payload: false,
    };
}

const resetAll = () => {
    return {
        type: "RESET",
        payload: 0,
    };
}

export {
  breakIncrement,
  breakDecrement,
  sessionIncrement,
  sessionDecrement,
  nameTimerSession,
  nameTimerBreak,
  intervalID,
  start,
  stop,
  resetAll
};

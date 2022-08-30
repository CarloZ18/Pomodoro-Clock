import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nameTimer: "Session",
  isRunning: false,
  sessionLength: 25,
  breakLength: 5,
  timer: 1500,
};

export const clockSlice = createSlice({
  name: "clock",
  initialState,
  reducers: {
    start: (state) => {
      state.isRunning = true;
    },
    stop: (state) => {
      state.isRunning = false;
    },
    resetAll: (state) => {
      state.isRunning = false;
      state.sessionLength = 25;
      state.breakLength = 5;
      state.nameTimer = "Session";
      state.timer = 1500;
    },
    incrementBreak: (state) => {
      if (state.breakLength < 60) {
        state.breakLength++;
        state.nameTimer === "Break"
          ? (state.timer = state.breakLength * 60)
          : (state.timer = state.timer);
      }
    },
    decrementBreak: (state) => {
      if (state.breakLength > 1) {
        state.breakLength--;
        state.nameTimer === "Break"
        ? (state.timer = state.breakLength * 60)
        : (state.timer = state.timer);
      }
    },
    incrementSession: (state) => {
      if (state.sessionLength < 60) {
        state.sessionLength++;
        state.nameTimer === "Session"
          ? (state.timer = state.sessionLength * 60)
          : (state.timer = state.timer);
      }
    },
    decrementSession: (state) => {
      if (state.sessionLength > 1) {
        state.sessionLength--;
        state.nameTimer === "Session"
          ? (state.timer = state.sessionLength * 60)
          : (state.timer = state.timer);
      }
    },
    changeTimerB: (state) => {
      state.nameTimer = "Break";
      state.timer = state.breakLength * 60;
    },
    changeTimerS: (state) => {
      state.nameTimer = "Session";
      state.timer = state.sessionLength * 60;
    },
    decrementTimer: (state) => {
      state.timer--;
    },
  },
});

export const {
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
} = clockSlice.actions;

export default clockSlice.reducer;

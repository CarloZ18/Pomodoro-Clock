import { faPause, faPlay } from "@fortawesome//free-solid-svg-icons";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  intervalID: 0,
  icon: faPlay,
  timer: 1500,
  isRunning: false,
  breakLength: 5,
  sessionLength: 25,
  nameTimer: "Session",
};

export const clockSlice = createSlice({
  name: "clock",
  initialState,
  reducers: {
    start: (state) => {
      state.icon = faPause;
       state.intervalID++;
    },
    stop: (state) => {
      state.icon = faPlay;
    },
    resetAll: (state) => {
      state.intervalID = 0;
      state.icon = faPlay;
    },
  },
});

export const { start, stop, resetAll } = clockSlice.actions;

export default clockSlice.reducer;


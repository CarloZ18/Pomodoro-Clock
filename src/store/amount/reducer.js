import { faPause, faPlay } from "@fortawesome//free-solid-svg-icons";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  icon: faPlay,
};

export const clockSlice = createSlice({
  name: "clock",
  initialState,
  reducers: {
    start: (state) => {
      state.icon = faPause;
    },
    stop: (state) => {
      state.icon = faPlay;
    },
    resetAll: (state) => {
      state.icon = faPlay;
    },
  },
});

export const { start, stop, resetAll } = clockSlice.actions;

export default clockSlice.reducer;


import { configureStore } from "@reduxjs/toolkit";
import {
  breakReducer,
  sessionReducer,
  isRunningReducer,
  nameTimerReducer,
  intervalIDReducer,
  changeIconReducer,
} from "./amount/reducer";

export const store = configureStore(
  {
    reducer: {
      break: breakReducer,
      session: sessionReducer,
      isRunning: isRunningReducer,
      nameTimer: nameTimerReducer,
      intervalID: intervalIDReducer,
      changeIcon: changeIconReducer,
    },
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

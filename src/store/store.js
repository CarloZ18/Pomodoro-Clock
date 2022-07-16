import { configureStore } from "@reduxjs/toolkit";
import  {clockSlice}  from "./amount/reducer";

export const store = configureStore(
  {
    reducer: { clock: clockSlice.reducer },
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

import { composeWithDevTools } from "redux-devtools-extension";
import { configureStore } from "@reduxjs/toolkit";
import { clockSlice } from "./amount/reducer";

export const store = configureStore(
  {
    reducer: clockSlice.reducer,
  },
  composeWithDevTools()
);

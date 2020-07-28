import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import AppRoutes from "./AppRoutes";
import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import logger from "redux-logger";
import { Provider } from "react-redux";
import { searchSlice } from "./components/SearchLibrary/searchLibrary.slice";
import { issueSlice } from "./components/IssueLibrary/issueLibrary.slice";

export const rootReducer = combineReducers({ search: searchSlice.reducer ,issue:issueSlice.reducer});

const middleware = [...getDefaultMiddleware(), logger];

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "productioon",
  middleware,
});

ReactDOM.render(
  <Provider store={store}>
    <AppRoutes />
  </Provider>,
  document.getElementById("root")
);

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import auth from "./authSlice";

const rootReducer = combineReducers({
  auth,
});

const masterReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
    };
    return nextState;
  } else {
    return rootReducer(state, action);
  }
};

const store = () =>
  configureStore({
    reducer: masterReducer,
  });

export const wrapper = createWrapper(store);

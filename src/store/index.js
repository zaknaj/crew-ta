import React, { createContext, useReducer } from "react";
import { reducer } from "./actions";

const initialState = {
  filters: [],
  data: [],
  page: 0,
  lastActions: [],
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };

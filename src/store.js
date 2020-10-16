import React, { createContext, useReducer } from "react";

const initialState = {
  filters: [],
  data: [],
  page: 0,
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "add": {
        const newData = [...state.data, ...action.value];
        const newState = { ...state, data: newData };
        action.value.length === 0
          ? (newState.page = -1)
          : (newState.page = state.page + 1);
        return newState;
      }
      case "add-filter": {
        const newFilters = [...state.filters, action.value];
        const newState = { ...state, filters: newFilters };
        return newState;
      }
      case "set-filter": {
        const newFilters = [action.value];
        const newState = { ...state, filters: newFilters };
        return newState;
      }
      case "remove-filter": {
        const newFilters = state.filters.filter((f) => f !== action.value);
        const newState = { ...state, filters: newFilters };
        return newState;
      }
      case "clear-filters": {
        const newState = { ...state, filters: [] };
        return newState;
      }
      case "move-candidates": {
        const newData = [...state.data];

        action.value.forEach((id) => {
          const index = newData.findIndex((el) => el.id === id);
          newData[index].stage = action.to;
        });

        const newState = { ...state, data: newData };
        return newState;
      }
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };

export const reducer = (state, action) => {
  switch (action.type) {
    // adds candidates received from fetch call to the backend
    case "add": {
      const newData = [...state.data, ...action.value];
      const newState = { ...state, data: newData };
      action.value.length === 0
        ? (newState.page = -1)
        : (newState.page = state.page + 1);
      return newState;
    }

    // push a new filter to the list of currently applied filters
    case "add-filter": {
      const newFilters = [...state.filters, action.value];
      const newState = { ...state, filters: newFilters };
      return newState;
    }

    // set a unique filter (removes all others) for when a tag on a card is clicked
    case "set-filter": {
      const newFilters = [action.value];
      const newState = { ...state, filters: newFilters };
      return newState;
    }

    // remove a specific filter (for when the filter is clicked in the navbar)
    case "remove-filter": {
      const newFilters = state.filters.filter((f) => f !== action.value);
      const newState = { ...state, filters: newFilters };
      return newState;
    }

    // clears all filters
    case "clear-filters": {
      const newState = { ...state, filters: [] };
      return newState;
    }

    // reverses last action, and clears it
    case "undo": {
      if (state.lastActions.length > 0) {
        const newData = [...state.data];
        const lastAction = state.lastActions[state.lastActions.length - 1];
        lastAction.ids.forEach((id) => {
          const index = newData.findIndex((el) => el.id === id);
          newData[index].stage = lastAction.from;
        });
        const newLastActions = [...state.lastActions];
        newLastActions.pop();
        const newState = {
          ...state,
          data: newData,
          lastActions: newLastActions,
        };
        return newState;
      }
      return state;
    }

    // called whenever one or more candidates have been moved
    case "record-last-action": {
      const lastAction = {
        from: action.from,
        to: action.to,
        ids: action.ids,
      };
      const newLastActions = [...state.lastActions, lastAction];
      const newState = { ...state, lastActions: newLastActions };
      return newState;
    }

    // move a list of candidates to another column (can be called with 1 candidate)
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
};

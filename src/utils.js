// necessary for react-dnd library
export const ItemTypes = {
  CARD: "card",
};

// returns only candidates that belong in the specified column and that include the filters
export const filterDataByColumn = (data, column, filters) => {
  return data.filter((el) => {
    const belongsInColumn = el.stage === column;
    let includesFilters = true;
    const searcheableString = `${el.firstName} ${el.lastName} ${
      el.job
    } ${el.tags.join(" ")}`;
    filters.forEach((filter) => {
      if (!searcheableString.toLowerCase().includes(filter.toLowerCase())) {
        includesFilters = false;
      }
    });

    return belongsInColumn && includesFilters;
  });
};

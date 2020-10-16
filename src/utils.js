export const ItemTypes = {
  CARD: "card",
};

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

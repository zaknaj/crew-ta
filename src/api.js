export const getCandidates = (page) => {
  return fetch(
    `https://hiring.crew.work/v1/talents?page=${page}&limit=30`
  ).then((res) => res.json());
};

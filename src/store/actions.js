export const updateKanjiCount = (id, count) => {
  return {
    type: 'UPDATE_COUNT',
    id,
    count,
  }
};

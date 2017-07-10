export const kanjis = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_COUNT':
      const newCount = state.get(action.id).set(action.count);
      return state.set(action.id, newCount);
    default:
      return state;
  }
};

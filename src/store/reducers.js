const kanjis = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_COUNT':
      return state.get(action.id).set(action.count);
    default:
      return state;
  }
}

export default kanjis;

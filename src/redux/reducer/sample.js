const initialState = {
  name: ' Kylian Gence',
};

const sampleReducer = (state = initialState, action) => {
  switch (action.type) {
    // Sample of a reducer action
    /* case ACTION:
      return {
        ...state,
        ...action.payload
      };
      */
    default:
      return state;
  }
};

export default sampleReducer;

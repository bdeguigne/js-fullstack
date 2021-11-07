const initialState = {
  isReady: false,
  username: '',
  roomID: '',
};

const sampleReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'READY':
      return {
        ...state,
        isReady: action.bool,
      };
    case 'USER':
      return {
        ...state,
        username: action.user,
      };
    case 'ROOMID':
      return {
        ...state,
        roomID: action.roomid,
      };
    default:
      return state;
  }
};

export default sampleReducer;

export default function setRoomId(roomid) {
  return async (dispatch) => {
    dispatch({ type: 'ROOMID', roomid });
  };
}

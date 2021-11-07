export default function setReady(bool) {
  return async (dispatch) => {
    dispatch({ type: 'READY', bool });
  };
}

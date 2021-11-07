import axios from 'axios';

export function registerUser(Pseudo, Password) {
  return async () => {
    try {
      await axios({
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'post',
        url: `${process.env.REACT_APP_API_END_POINT}/users`,
        data: {
          username: Pseudo,
          password: Password,
        },
      });
      return true;
    } catch {
      return false;
    }
  };
}

export default function setUsername(user) {
  return async (dispatch) => {
    dispatch({ type: 'USER', user });
  };
}

export function logUser(Pseudo, Password) {
  return async (dispatch) => {
    try {
      const res = await axios({
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'post',
        url: `${process.env.REACT_APP_API_END_POINT}/auth/login`,
        data: {
          username: Pseudo,
          password: Password,
        },
      });
      if (res.status === 200) {
        dispatch({ type: 'USER', user: res.data.username });
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };
}

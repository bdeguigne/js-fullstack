import axios from 'axios';

export function registerUser(Pseudo, Password) {
  return async () => {
    const res = await axios({
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'post',
      url: 'http://localhost:8080/users',
      data: {
        username: Pseudo,
        password: Password,
      },
    });
    console.log(res);
  };
}

export default function setUsername(user) {
  return async (dispatch) => {
    dispatch({ type: 'USER', user });
  };
}

export function logUser(Pseudo, Password) {
  return async (dispatch) => {
    const res = await axios({
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'post',
      url: 'http://localhost:8080/auth/login',
      data: {
        username: Pseudo,
        password: Password,
      },
    });
    console.log(res);
    if (res.status === 200) {
      console.log(res.data.username);
      dispatch({ type: 'USER', user: res.data.username });
      return true;
    }
    return false;
  };
}

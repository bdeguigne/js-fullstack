import axios from 'axios';

export default function logUser(Pseudo, Password) {
  return async () => {
    const res = await axios({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
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

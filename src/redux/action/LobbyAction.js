import axios from 'axios';

export function getAllLobby() {
  return async () => {
    const res = await axios({
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'get',
      url: 'http://localhost:8080/lobby',
    });
    console.log(res);
  };
}

export function createLobby(playerOne) {
  return () => {
    axios({
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'post',
      url: 'http://localhost:8080/lobby',
      data: {
        playerA: playerOne,
      },
    });
  };
}

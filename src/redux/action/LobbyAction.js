import axios from 'axios';

export function getAllLobby() {
  return () => {
    axios({
      method: 'get',
      url: 'localhost:8080/lobby',
    });
  };
}

export function createLobby(playerOne) {
  return () => {
    axios({
      method: 'post',
      url: 'localhost:8080/lobby',
      data: {
        playerA: playerOne,
      },
    });
  };
}

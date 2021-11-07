import axios from 'axios';

export function getAllLobby() {
  return async () => {
    try {
      const res = await axios({
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'get',
        url: `${process.env.REACT_APP_API_END_POINT}/lobby`,
      });
      return res.data;
    } catch {
      return null;
    }
  };
}

export function createLobby(playerOne) {
  return async () => {
    try {
      const res = await axios({
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'post',
        url: `${process.env.REACT_APP_API_END_POINT}/lobby`,
        data: {
          playerA: playerOne,
        },
      });
      return res;
    } catch {
      return null;
    }
  };
}

export function setLobbyStatusInProgress(roomId) {
  return async () => {
    try {
      const res = await axios({
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'patch',
        url: `${process.env.REACT_APP_API_END_POINT}/lobby/${roomId}`,
        data: {
          status: 'IN_PROGRESS',
        },
      });
      return res;
    } catch {
      return null;
    }
  };
}

export function setLobbyStatusFinished(roomId) {
  return async () => {
    try {
      const res = await axios({
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'patch',
        url: `${process.env.REACT_APP_API_END_POINT}/lobby/${roomId}`,
        data: {
          status: 'FINISHED',
        },
      });
      return res;
    } catch {
      return null;
    }
  };
}

export function addPlayerBToLobby(roomId, playerName) {
  return async () => {
    try {
      const res = await axios({
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'patch',
        url: `${process.env.REACT_APP_API_END_POINT}/lobby/${roomId}`,
        data: {
          playerB: playerName,
        },
      });
      return res;
    } catch {
      return null;
    }
  };
}

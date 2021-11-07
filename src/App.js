import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SocketContext, socket } from './socket';
import Home from './Views/Home';
import MediaControlCard from './Views/Lobby';
import Board from './Views/InGame';

function App() {
  return (
    <SocketContext.Provider value={socket}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lobby" element={<MediaControlCard />} />
          <Route path="/lobby/game" element={<Board />} />
        </Routes>
      </BrowserRouter>
    </SocketContext.Provider>
  );
}

export default App;

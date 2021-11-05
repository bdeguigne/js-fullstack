import { Router, Route, Switch } from 'react-router-dom';
import { SocketContext, socket } from './socket';
import history from './utils/history';
import Home from './Views/Home';
import MediaControlCard from './Views/Lobby';
import Board from './Views/InGame';

function App() {
  return (
    <SocketContext.Provider value={socket}>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/lobby" component={MediaControlCard} />
          <Route exact path="/lobby/game" component={Board} />
        </Switch>
      </Router>
    </SocketContext.Provider>
  );
}

export default App;

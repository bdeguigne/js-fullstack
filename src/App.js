import './App.css';
import { Router, Route, Switch } from 'react-router-dom';
import history from './utils/history';
import Home from './components/Forms';
import MediaControlCard from './Views/Lobby';

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/lobby" component={MediaControlCard} />
      </Switch>
    </Router>
  );
}

export default App;

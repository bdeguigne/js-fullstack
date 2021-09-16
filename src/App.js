import './App.css';
import history from "./utils/history";
import { Router, Route, Switch } from "react-router-dom";
import Home from './Views/Home';

function App() {
  return (
    <Router history={history}>
    <Switch>
            <Route path="/" component={Home} />
    </Switch>
    </Router>
  );
}

export default App;

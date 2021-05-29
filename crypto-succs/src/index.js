import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import PlantGrid from './plant_grid.js'
import Hello from './landing_screen.js'

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Landing</Link>
            </li>
            <li>
              <Link to="/home">Home</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/home">
            <PlantGrid />
          </Route>
          <Route path="/">
            <Hello />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
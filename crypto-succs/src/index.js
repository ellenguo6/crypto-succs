import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import LandingScreen from './screens/landing_screen.js'
import PlantScreen from './screens/plant_screen.js';
import { Plant } from './models/plant.js';
import HomeScreen from './screens/home_screen.js';

export default function App() {
  const plants = 
    [new Plant("Planty McPlant", "Godly", "Bordering on existential crisis", 2.0), 
    new Plant("Kack Tus", "0110101011", ":)", 3.0), 
    null, null, null, null, null, null, null, null, null, null];

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
            <li>
              <Link to="/plant/0">Generic Plant</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/home">
            <HomeScreen plants={plants}/>
          </Route>
          <Route path="/plant/:id">
            <PlantScreen plants={plants} />
          </Route>
          <Route path="/">
            <LandingScreen />
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
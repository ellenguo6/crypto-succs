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
  import ShopScreen from './screens/shop_screen.js';
  import BreedScreen from './screens/breeding_screen.js';
  import { Pot } from './models/pot.js';
  
  export default function App() {
    const plants = 
      [new Plant("Planty McPlant", 11, 1, "Bordering on existential crisis", 2.0), 
      new Plant("Kack Tus", 0, 2, ":)", 3.0), 
      null, null, null, null, null, null, null, null, null, null];
    
    const pots = [null, new Pot(1), new Pot(0)];
  
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
                <Link to="/shop">Shop</Link>
              </li>
              <li>
                <Link to="/plant/0">Generic Plant</Link>
              </li>
              {/*remember to take out later*/}
              <li>
                <Link to="/breed">Breed</Link>
              </li>
            </ul>
          </nav>
  
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/home">
              <HomeScreen plants={plants} pots={pots}/>
            </Route>
            <Route path="/shop">
              <ShopScreen />
            </Route>
            <Route path="/plant/:id">
              <PlantScreen plants={plants} pots={pots} />
            </Route>
            <Route path="/">
              <LandingScreen />
            </Route>
            {/*remember to take out later*/}
            <Route path="/breed">
              <BreedScreen />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
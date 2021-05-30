  import LandingScreen from './screens/landing_screen.js'
  import PlantScreen from './screens/plant_screen.js';
  import { Plant } from './models/plant.js';
  import HomeScreen from './screens/home_screen.js';
  import ShopScreen from './screens/shop_screen.js';
  import BreedScreen from './screens/breeding_screen.js';
  import { Pot } from './models/pot.js';
  import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import {useEffect, useState} from 'react';
  import Web3 from 'web3';
  import {
      SUCC_OWNERSHIP_ADDRESS,
      SUCC_OWNERSHIP_ABI
    } from "./config"
import {
    getAccount,
    getSuccContract,
    buySucc,
    getPotContract,
    getPotAdmin,
    getSuccIds,
} from './backend/backend.js'
  
  export default function App() {
    const web3 = new Web3(Web3.givenProvider || "https://rpc-mumbai.matic.today/")

    const default_plants = new Array(12).fill(null);

    const [plants, setPlants] = useState(default_plants);
    const [pots, setPots] = useState();
    const [account, setAccount] = useState();
    const [succContract, setSuccContract] = useState();

    async function setupBlockchain() {
        const account = await getAccount(web3)
        setAccount(account);
        const succContract = await getSuccContract(web3);
        setSuccContract(succContract);
        const potContract = await getPotContract(web3);
        const admin = await getPotAdmin(potContract);
        console.log(admin)
    }

    async function getPlants() {
        if(!account || !succContract) {
            console.log('bruh you gotta connect ur accnt first')
        }
        const plantIds = await getSuccIds(web3, account, succContract);
        console.log(plantIds)
    }

    async function buyPlant() {
        if(!account || !succContract) {
            console.log('bruh you gotta connect ur accnt first')
        }
        await buySucc(web3, succContract, account, 0, 0)
    }

    // const plants = 
    //   [new Plant("Planty McPlant", 11, 1, "Bordering on existential crisis", 2.0), 
    //   new Plant("Kack Tus", 0, 2, ":)", 3.0), 
    //   null, null, null, null, null, null, null, null, null, null];
    
    // const pots = [null, new Pot(1), new Pot(0)];


  
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
              <HomeScreen plants={plants} pots={pots}/>
            </Route>
            <Route path="/">
              <LandingScreen setupBlockchain={setupBlockchain} account={account} setAccount={setAccount} buyPlant={buyPlant} getPlants={getPlants}/>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
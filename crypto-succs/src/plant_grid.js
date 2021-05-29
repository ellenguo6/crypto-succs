import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import green from "@material-ui/core/colors/green";
import Paper from '@material-ui/core/Paper';
import {Link} from "react-router-dom";
import Modal from "./plant_popUp";
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Bar from "./progressbar"

import "./index.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 150,
    width: 150,
  },
  paperback: {
    height: 150,
    width: 150,
    background: "#12112e",
    margin: "auto"

  },
  control: {
    padding: theme.spacing(2),
  },
  margin: {
    margin: theme.spacing(1),
  },
}));


function Plant(props) {
  const classes = useStyles();
  const {plant, id, pots} = props;
  const [isOpen, setIsOpen] = useState(false);

  <button >
    Test Popup
  </button>

  

  if(plant) {
    const pot = pots[plant.potId];
    if(pot) {
      return (
        <>
        <ButtonBase onClick={()=> setIsOpen(true)}>
          <Paper className={classes.paper} elevation={0}>   
            <img className = "image" alt = 'succ' src={plant.getPlantImg()} />
            <img className = "image" alt = 'pot' src={pot.getPotImg()}/>
            {plant.name}
          </Paper>
        </ButtonBase>

        <Modal className = "plant-popup" open={isOpen} onClose={() => setIsOpen(false)}>
          <div>
            <br></br>
            <h3 className = "left">{plant.name}</h3>
          </div>
          <div>
            <Paper className={classes.paperback} elevation={1}>   
              <img className = "image" alt = 'succ' src={plant.getPlantImg()} />
              <img className = "image" alt = 'pot' src={pot.getPotImg()}/>
            </Paper>
            <br></br>
            <div>
              <Bar bgcolor='#00695c' completed={plant.getPlantGrowth() * 10}/>
              <body className = "center">Growth Level</body>
            </div>
            <div className = "center">
              <Button className={classes.margin} size="small" variant="contained">
                Water
              </Button>
              <Button className={classes.margin} size="small" variant="contained" disabled>
                Locked
              </Button>
            </div>
          </div>
        </Modal> 
        </>
      );
    } else {
      return (
        <Link to={"/plant/" + id}>
        <Paper className={classes.paper} elevation={0}>   
          <img className = "image" alt = 'succ' src={plant.getPlantImg()} />
          {plant.name}
        </Paper>
        </Link>
      );
    }
    
  } else {
    return (
      //delete outline for demo, keep for now so can see where boxes are
      <Paper className={classes.paper} elevation={0} variant="outlined" />
    );
  }
}

function PlantRow(props) {
  const {plants, pots} = props;
  

  return(
    <Grid item xs={12}>
        <Grid container spacing={12} justify="flex-end" direction="row">
          {plants.map((plant, id) => (
            <Grid item xs key={id} item>
              <Plant plant={plant} id={id} pots={pots}/>
            </Grid>
          ))}
        </Grid>
      </Grid>
  );
}

export default function PlantGrid(props) {
  const classes = useStyles();
  const row1 = props.plants.slice(0, 4);
  const row2 = props.plants.slice(4, 8);
  const row3 = props.plants.slice(8, 12);
  const pots = props.pots;

  

  //can u make grid rows right aligned? I tried flex-end but not working :((
  return (
    <div>
    {/* <Bar />*/}

    <div style={{ padding: 70 }} >
    <Grid container className={classes.root} spacing={2} justify = "flex-end" direction="column">
      <div style={{ padding: 20}}>
      <Grid container item xs spacing={12}>
        <PlantRow plants={row1} pots={pots}/>
      </Grid>
      </div>
      <div style={{ padding: 20}}>
      <Grid container item xs spacing={12}>
        <PlantRow plants={row2} pots={pots}/>
      </Grid>
      </div>
      <div style={{ padding: 20}}>
      <Grid container item xs spacing={12}>
        <PlantRow plants={row3} pots={pots}/>
      </Grid>
      </div>
    </Grid>
    </div>
    </div>  
  );
}
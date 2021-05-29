import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import green from "@material-ui/core/colors/green";
import Paper from '@material-ui/core/Paper';
import {Link} from "react-router-dom";

import a0 from './images/aloeVera.png';
import a1 from './images/pincushionCactus.png';
import a2 from './images/dudleya.png';
import b0 from './images/pot1.png';
import b1 from './images/pot2.png';
import b2 from './images/pot3.png';

import "./index.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 150,
    width: 150,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

function Plant(props) {
  const classes = useStyles();
  /*id's have to start with a letter in order
  so the variable names match up
  not sure if id is gonna be the same as dna? a tad
  confused but I'm sure you'll fix*/ 
  const {plant, id} = props;
  

  if(plant) {
    return (
      //replace stuff inside src{} with correct part of id/dna code
      <Link to={"/plant/" + id}> <Paper className={classes.paper} elevation={0}>   
        <img className = "image" alt = 'succ' src={a0} />
        <img className = "image" alt = 'pot' src={b0}/>
        {plant.name}
      </Paper>
      </Link>
    );
  } else {
    return (
      //delete outline for demo, keep for now so can see where boxes are
      <Paper className={classes.paper} elevation={0} variant="outlined" />
    );
  }
}

function PlantRow(props) {
  const plants = props.plants;

  return(
    <Grid item xs={12}>
        <Grid container spacing={12} justify="flex-end" direction="row">
          {plants.map((plant, id) => (
            <Grid item xs key={id} item>
              <Plant plant={plant} id={id} />
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
  
  //can u make grid rows right aligned? I tried flex-end but not working :((
  return (
    <div style={{ padding: 70 }} >
    <Grid container className={classes.root} spacing={2} justify = "flex-end" direction="column">
      <div style={{ padding: 20}}>
      <Grid container item xs spacing={12}>
        <PlantRow plants={row1}/>
      </Grid>
      </div>
      <div style={{ padding: 20}}>
      <Grid container item xs spacing={12}>
        <PlantRow plants={row2}/>
      </Grid>
      </div>
      <div style={{ padding: 20}}>
      <Grid container item xs spacing={12}>
        <PlantRow plants={row3}/>
      </Grid>
      </div>
    </Grid>
    </div>
  );
}
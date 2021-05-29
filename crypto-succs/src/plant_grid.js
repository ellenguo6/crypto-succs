import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import green from "@material-ui/core/colors/green";
import Paper from '@material-ui/core/Paper';
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
    backgroundColor: green[300],
  },
  control: {
    padding: theme.spacing(2),
  },
}));

function Plant(props) {
  const classes = useStyles();
  const {plant, id} = props;
  if(plant) {
    return (
      <Link to={"/plant/" + id}> <Paper className={classes.paper} > {plant.name} </Paper> </Link>
    );
  } else {
    return (
      <Paper className={classes.paper} />
    );
  }
}

function PlantRow(props) {
  const plants = props.plants;

  return(
    <Grid item xs={12}>
        <Grid container justify="space-around" >
          {plants.map((plant, id) => (
            <Grid key={id} item>
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
  

  return (
    <div style={{ padding: 70 }} >
    <Grid container className={classes.root} spacing={2}>
      <PlantRow plants={row1}/>
      <div style={{ padding: 30}}/>
      <PlantRow plants={row2}/>
      <div style={{ padding: 30}}/>
      <PlantRow plants={row3}/>
    </Grid>
    </div>
  );
}
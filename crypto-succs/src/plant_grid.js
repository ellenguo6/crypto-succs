import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import green from "@material-ui/core/colors/green";
import Paper from '@material-ui/core/Paper';

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

function PlantRow() {
  const classes = useStyles();

  return(
    <Grid item xs={12}>
        <Grid container justify="space-around" >
          {[0, 1, 2, 3,].map((value) => (
            <Grid key={value} item>
              <Paper className={classes.paper} />
            </Grid>
          ))}
        </Grid>
      </Grid>
  );
}

export default function PlantGrid() {
  const classes = useStyles();

  return (
    <div style={{ padding: 70 }} >
    <Grid container className={classes.root} spacing={2}>
      <PlantRow/>
      <div style={{ padding: 30}}/>
      <PlantRow/>
      <div style={{ padding: 30}}/>
      <PlantRow/>
    </Grid>
    </div>
  );
}
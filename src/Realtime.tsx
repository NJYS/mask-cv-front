import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
    root : {
      width : 500,
    },
    button: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: 'none',
    },
    main : {
      padding : '2em',
      backgroundColor: '#cfe8fc',
      height: '60vh', 
      //margin: '1em',
      overflow: 'auto',
      border: '2px solid palevioletred',
  }
}));

function RealTime(){
    const classes = useStyles();

    return (
      <>
      <Grid container spacing={0} direction="column" alignItems="center" justify="center">
          <Box mt="2rem"/>
        <Container maxWidth="sm">
          <Typography component="div" align = "center" className ={classes.main}>
            <Box mt="3rem"/>
          </Typography>
        </Container>
        <Box mb="0.5rem"/>
        <Grid container spacing={5} direction="row" alignItems="center" justify="center">
          <Grid item>
            <Tooltip title="classification" arrow>
              <Button variant="contained" size="small" color="primary">class🧡</Button>
            </Tooltip>
          </Grid>
          <Grid item>
            <Tooltip title="segmentation" arrow>
              <Button variant="contained" size="small" color="primary">seg💛</Button>
            </Tooltip>
          </Grid>
          <Grid item>
          <Tooltip title="detection" arrow>
              <Button variant="contained" size="small" color="primary">det💙</Button>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
      <Box mb="0.5rem"/>
    </> 
    );
}


export default RealTime;
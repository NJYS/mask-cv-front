import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

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
  }));

function RealTime(){
    const classes = useStyles();

    return (
      <>
      <Typography component="div" align="center">
        <Button variant="contained" color="primary" >1</Button>
        <Button variant="contained" color="primary" >2</Button>
        <Button variant="contained" color="primary" >3</Button>
        {/* <IconButton
            edge="end"
            color="inherit"
            aria-label="mode"
            onClick={() => setTheme(!theme)}
          >
            {icon}
        </IconButton> */}
      </Typography>
    </> 
    );
}


export default RealTime;
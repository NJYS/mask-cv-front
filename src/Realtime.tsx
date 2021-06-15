import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useMutation } from 'react-query';

// components
import WebcamDrawing from './components/WebcamDrawing';

// material-UI
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';


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
      // border: '2px solid palevioletred',
      //border-radius: '5px',
  },
  progressCircle : {
    margin:'1em'
  }
}));

function RealTime(){
    const classes = useStyles();

    const [previewURL, setPreview] = useState<string>('');
    const [isSetImage, setImage] = useState<boolean>(false);
    const [result, setResult] = useState<string>('');
    const [camState, setCam] = useState<boolean>(false);

    // webcam
    const camToggle = () => {
      setCam(camState => !camState);
    }
        
    return (
      <>
      <Grid container spacing={0} direction="column" alignItems="center" justify="center">
          <Box mt="10rem"/>
          <Container maxWidth="sm">
          <Grid item>
          <Paper elevation={4} className ={classes.main}>
            {camState ? <WebcamDrawing setPreview = {setPreview} camToggle ={camToggle}/> : null}
            <Box mt="3rem"/>
          </Paper>
          </Grid>
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
          <Grid item>
            <label htmlFor="open_webcam">
            <Tooltip title="webcam on/off" arrow>
            <IconButton color="primary" aria-label="open_webcam" component="span" onClick={camToggle}>
                {camState ? <VideocamOffIcon fontSize = 'large'/> : <VideocamIcon fontSize = 'large'/>}
            </IconButton>
            </Tooltip>
            </label>
          </Grid>
        </Grid>
      </Grid>
      <Box mb="0.5rem"/>
    </> 
    );
}


export default RealTime;
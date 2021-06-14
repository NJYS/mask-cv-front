import React, { useState } from 'react';
import Appbar from './components/Appbar';
import Cambox from './components/Cambox';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Container from '@material-ui/core/Container';
import HomeIcon from '@material-ui/icons/Home';
import CenterFocusStrongIcon from '@material-ui/icons/CenterFocusStrong';
import { BrowserRouter, Route, Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root : {
    width : 500,
  },
  button: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const lightTheme = createMuiTheme({
  palette: {
    type : 'light',
  },
});

const darkTheme = createMuiTheme({
  palette: {
    type : 'dark',
  },
});

function App2() {
  const classes = useStyles();
  // 다크모드
  const [theme, setTheme] = useState<boolean>(true)
  const [value, setValue] = useState(0);
  const appliedTheme = createMuiTheme(theme ? lightTheme : darkTheme)
  //
  return (
    <>
    <BrowserRouter>
    {/* <Link to="/">분류</Link><br />
    <Link to="/realtime">실시간</Link> */}

    <ThemeProvider theme={appliedTheme}>
      <Appbar theme = {theme} setTheme = {setTheme} ></Appbar>
      <Route exact path = "/" component = {Home}/>
      <Route path = "/realtime" component = {RealTime}/>
      <Grid container spacing={0} direction="column" alignItems="center" justify="center">
          <br />
          <br />
          <BottomNavigation value={value} onChange={(event, newValue) => {setValue(newValue);}} showLabels className={classes.root}>
            <BottomNavigationAction label="Home" icon={<HomeIcon />} />
            <BottomNavigationAction label="Seg-Det" icon={<CenterFocusStrongIcon />} />
            <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
          </BottomNavigation>
      </Grid> 
    </ThemeProvider>
    </BrowserRouter>
    </>
  );
}

function Home(){
  const classes = useStyles();

  return (
    <>
    <Cambox></Cambox>
      <Typography component="div" align="center" className={classes.button}>
        {/* <Button variant="contained" color="primary" >1</Button>
        <Button variant="contained" color="primary" >2</Button>
        <Button variant="contained" color="primary" >3</Button> */}
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

function RealTime(){
  const classes = useStyles();

  return (
    <>
    <Cambox></Cambox>
    <Typography component="div" align="center" className={classes.button}>
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

export default App2;
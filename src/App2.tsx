import React, { useState } from 'react';
import Appbar from './components/Appbar';
import Cambox from './components/Cambox';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Container from '@material-ui/core/Container';
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
      <Container maxWidth="sm" >
        <br />
        <br />
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.root}
      > 
      <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
      <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
      <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
      </BottomNavigation>
      </Container>
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
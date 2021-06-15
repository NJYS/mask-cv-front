import React, { useState} from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

// pages
import Home from './Home';
import Realtime from './Realtime';

// components
import Appbar from './components/Appbar';

// material UI
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Container from '@material-ui/core/Container';
import HomeIcon from '@material-ui/icons/Home';
import CenterFocusStrongIcon from '@material-ui/icons/CenterFocusStrong';
import IconButton from '@material-ui/core/IconButton'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import orange from '@material-ui/core/colors/orange';
import { CssBaseline } from '@material-ui/core';


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

function App2() {
  const classes = useStyles();
  const prefersDarkMode : boolean = useMediaQuery('(prefers-color-scheme: dark)');
  const [theme, setTheme] = useState<boolean>(prefersDarkMode) // 다크모드
  const [value, setValue] = useState(0);

  const appliedTheme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: theme ? 'dark' : 'light',
        },
      }),
    [theme],
  );

  
  return (
    <>
    <BrowserRouter>
    <ThemeProvider theme={appliedTheme}>
      <CssBaseline/>
      <Appbar theme = {theme} setTheme = {setTheme}></Appbar>
      <Grid container spacing={0} direction="column" alignItems="center" justify="center">
        <Route exact path = "/" component = {Home}/>
        <Route path = "/realtime" component = {Realtime}/>
          <BottomNavigation value={value} onChange={(event, newValue) => {setValue(newValue);}} showLabels className={classes.root}>
            <BottomNavigationAction component = {Link} to ="/" label="Home" icon={<HomeIcon />} />
            <BottomNavigationAction component = {Link} to ="/realtime" label="Seg-Det" icon={<CenterFocusStrongIcon />} />
            {/* <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} /> */}
          </BottomNavigation>
      </Grid> 
    </ThemeProvider>
    </BrowserRouter>
    </>
  );
}





export default App2;
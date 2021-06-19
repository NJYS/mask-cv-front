import React, { useState} from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

// pages
import Home from './Home';
import Realtime from './Realtime';

// components
import Appbar from './components/Appbar';

// material UI
import Grid from '@material-ui/core/Grid';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import CenterFocusStrongIcon from '@material-ui/icons/CenterFocusStrong';
import useMediaQuery from '@material-ui/core/useMediaQuery';
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
            <BottomNavigationAction component = {Link} to ="/" label="Classify" icon={<ImageSearchIcon />} />
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
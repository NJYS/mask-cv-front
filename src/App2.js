import React, { useState } from 'react';
import Appbar from './components/Appbar';
import Cambox from './components/Cambox';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Brightness3Icon from "@material-ui/icons/Brightness3";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import IconButton from "@material-ui/core/IconButton";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  button: {
    '& > *': {
      margin: theme.spacing(1),
      
    },
  },
}));

function App2() {
  const classes = useStyles();
  // 다크모드
  const [theme, setTheme] = useState(true)
  const icon = !theme ? <Brightness7Icon /> : <Brightness3Icon /> // Icons imported from `@material-ui/icons`
  const appliedTheme = createMuiTheme(theme ? light : dark)
  //
  return (
    <>
    <ThemeProvider theme={appliedTheme}>
      <Appbar></Appbar>
      <Cambox></Cambox>
      <Typography component="div" align="center" className={classes.button}>
        <Button variant="contained" color="primary" >1</Button>
        <Button variant="contained" color="primary" >2</Button>
        <Button variant="contained" color="primary" >3</Button>
        <IconButton
            edge="end"
            color="inherit"
            aria-label="mode"
            onClick={() => setTheme(!theme)}
          >
            {icon}
        </IconButton>
      </Typography>
    </ThemeProvider>
    </>
  );
}
export const light = {
  palette: {
  type: 'light',
  },
  };
export const dark = {
  palette: {
  type: 'dark',
  },
  };
export default App2;
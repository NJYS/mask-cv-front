import React, { useState, useEffect} from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import axios from 'axios';
import { useMutation } from 'react-query';

// components
import Appbar from './components/Appbar';
import ImageResizer from './components/ImageResizer';
import WebcamCapture from './components/WebcamCapture';

// material UI
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
import CssBaseline from '@material-ui/core/CssBaseline';

interface picture {
  image : string;
}

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

  const [previewURL, setPreview] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [camState, setCam] = useState<boolean>(false);
  const [fileValue, setFile] = useState<HTMLInputElement>();

  const token = `${'njys'}:${'1q2w3e4r!'}`;
  const encodedToken = Buffer.from(token).toString('base64');
  const headers = { 'Authorization': 'Basic '+ encodedToken };
  const api = axios.create({
    baseURL: `https://boostcamp-nyjs.herokuapp.com/`,
    headers: headers
  })

  const [mutateCreate, {status: PostStatus}] = useMutation((data: picture) => api.post('masks/', data), { 
    onSuccess: (res) => {
      setResult(res.data.result)
    },
    onError : () => {
      setResult('전송 오류')
    }
  })

  const Submit = (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const json : string = JSON.stringify({
      image : previewURL,
    })
    const obj : picture = JSON.parse(json);
    mutateCreate(obj);
  }

  useEffect(() =>{ // loading check
    if(PostStatus === 'loading'){
      setResult('Loading...')
    }
  }, [PostStatus, setResult]);


  const handleFileInput = async (e : React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    // 파일 읽기
    setFile(target);
    try {
      if(target){
        let file = target.files![0];
        const image : string = await ImageResizer(file);
        setPreview(image);
        setResult('');
      }
    } catch { 
      // 오류 메시지 등록 후 박스 내 이미지 제거
      setResult('업로드 오류');
      setPreview('');
    }
  }

  const Result = () => {
    return (
        <p id="res">{result}</p>
    )
  }
  
  let profile_preview = <img className='profile_preview' src={previewURL} alt=""/>

  // webcam
  const camToggle = () => {
    setResult('');
    setCam(camState => !camState);
    // 웹캠 켰을 때 기존 사진 정보 제거
    if(fileValue !== undefined) {
      fileValue!.value! = '';
      setPreview('');
    }
  }
  
  // 모달이 화면 가운데 위치하도록 계산
  let modal_margin : string = (window.innerHeight/4).toString() +"px auto"

  return (
    <>
    {camState ? 
      <div className="modal">
        <div className="modal-content" style={{margin:modal_margin}}>
          <WebcamCapture setPreview = {setPreview} camToggle ={camToggle}/>
        </div>
      </div> 
    : null}
      <CssBaseline />
      <Container maxWidth="sm">
        {profile_preview}
        <Result/>
        <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '50vh' }} />
      </Container>
    <input type = "file" id ="image_uploads" accept="image/*" onChange={handleFileInput}/>
    <button className = "btn" onClick={camToggle}>웹캠</button>
    <button className = "btn" onClick={Submit}>제출</button>
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
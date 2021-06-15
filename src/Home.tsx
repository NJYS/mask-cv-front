import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useMutation } from 'react-query';

// components
import ImageResizer from './components/ImageResizer';
import WebcamCapture from './components/WebcamCapture';

// material UI
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import AttachmentIcon from '@material-ui/icons/Attachment';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

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
    input: {
      display: 'none',
    },
}));

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
  
      if(previewURL === '') { 
        setResult('파일이 없습니다.');
        return;
      } 
  
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
  
    useEffect(() => {
      if(camState) setPreview('');
    }, [camState, setPreview]);
  
    const handleFileInput = async (e : React.FormEvent<HTMLInputElement>) => {
      e.preventDefault();
      const target = e.target as HTMLInputElement;
      // 파일 읽기
      setFile(target);
      try {
        if(target){
          let file : File = target.files![0];
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

    const Loading = () => {
        return (
            <p></p>
        )
      }
  
    // webcam
    const camToggle = () => {
      setResult('');
      setCam(camState => !camState);
      // 웹캠 켰을 때 기존 사진 정보 제거
      if(fileValue !== undefined) {
        fileValue.value = '';
      }
    }
  
    return (
      <>
      <Grid container spacing={0} direction="column" alignItems="center" justify="center">
        <Container maxWidth="sm">
          <Typography component="div" align = "center" style={{ padding : '4em', backgroundColor: '#cfe8fc', height: '50vh' }}>
          {camState ? <WebcamCapture setPreview = {setPreview} camToggle ={camToggle}/> : null}
            <img className='profile_preview' src={previewURL} alt=""/>
            <Result/>
          </Typography>
        </Container>
        <Grid container spacing={5} direction="row" alignItems="center" justify="center">
          <Grid item>
            <input type = "file" id ="image_uploads" accept="image/*" onClick ={()=>{setResult(''); setPreview('');}} onChange={handleFileInput} className = {classes.input} />
            <label htmlFor="image_uploads">
            <IconButton color="primary" aria-label="upload" component="span">
              < AttachmentIcon/>
            </IconButton>
            </label>
          </Grid>
          <Grid item>
            <label htmlFor="open_webcam">
            <IconButton color="primary" aria-label="open_webcam" component="span" onClick={camToggle}>
                <PhotoCamera />
            </IconButton>
            </label>
          </Grid>
          <Grid item>
            <Button variant="contained" size="small" color="primary" onClick={Submit}>제출</Button>
          </Grid>
        </Grid>
      </Grid>
      </> 
    );
  }

  export default Home;
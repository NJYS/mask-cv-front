import React, { useState, useEffect} from 'react';
import './App.scss';
import './styles/Result.scss'
import axios from 'axios';
import ImageResizer from './components/ImageResizer';
import WebcamCapture from './components/WebcamCapture';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { useMutation } from 'react-query';

interface picture {
  image : string;
}

function App() {
  
  return (
    <BrowserRouter>
    {/* <Link to="/">분류</Link><br />
    <Link to="/realtime">실시간</Link> */}

    <Route exact path = "/" component = {Home}/>
    <Route path = "/realtime" component = {RealTime}/>
    </BrowserRouter>
  );
}


function Home(){
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

    <div className="background-img">
          <div className = "head">NJYS</div>
          <div className = "secondHead"> 마스크 착용 분류 </div>
        <div className = "body">
          <div className = "container">
            {profile_preview}
            <Result/>
          </div>
          <input type = "file" id ="image_uploads" accept="image/*" onChange={handleFileInput}/>
          <button className = "btn" onClick={camToggle}>웹캠</button>
          <button className = "btn" onClick={Submit}>제출</button>
        </div>
    </div>
    </>
  );
}

function RealTime(){
  return (
    <div className="background-img">
    <div className = "head">NJYS</div>
    <div className = "secondHead"> 실시간 마스크 확인 </div>
  <div className = "body">
    <div className = "container">
    </div>
  </div>
</div>
  );
}

export default App;
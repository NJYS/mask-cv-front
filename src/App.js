import React, { useState } from 'react';
import './App.scss';
import axios from 'axios';
import ImageResizer from './components/ImageResizer.jsx';
import WebcamCapture from './components/WebcamCapture.jsx';
import Results from './components/Results.jsx'
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { useMutation } from 'react-query';

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
  const [previewURL, setPreview] = useState('');
  const [result, setResult] = useState('');
  const [camState, setCam] = useState(false);
    
  const token = `${'njys'}:${'1q2w3e4r!'}`;
  const encodedToken = Buffer.from(token).toString('base64');
  const headers = { 'Authorization': 'Basic '+ encodedToken };
  const api = axios.create({
    baseURL: `https://boostcamp-nyjs.herokuapp.com/`,
    headers: headers
  })

const [mutateCreate, {status: PostStatus}] = useMutation(json => api.post('masks/', json), { 
    onSuccess: (res) => {
      setResult(res.data.result)
    },
    onError : () => {
      setResult('전송 오류')
    },
  });

  const Submit = async (e) => {
    e.preventDefault();

    const json = JSON.stringify({
      image : previewURL,
    })
    mutateCreate(json);
    console.log(PostStatus);
  }


  const handleFileInput = async (event) => {
    event.preventDefault();

    // 파일 읽기
    try {
      const file = event.target.files[0];
      let image = undefined;
      if (file){
        image = await ImageResizer(file);
        setPreview(image);
        setResult('');
      }
      //console.log(image)
    } catch (err) { 
      //
    }
  }
  
  let profile_preview = <img className='profile_preview' src={previewURL} alt=""/>

  // webcam
  const camToggle = () => {
    setResult('');
    setCam(camState => !camState);
  }
  
  //사이즈 재서 모달 가운데 위치하게
  let modal_margin = String(window.innerHeight/4)+"px"+" auto"

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
            <Results result={result}></Results>
          </div>
          <input type = "file" id ="image_uploads" accept="image/*" onChange={handleFileInput}/>
          <button className = "btn" onClick={camToggle}>웹캠</button>
          <button className = "btn" onClick={Submit}>제출</button>
        </div>
    </div>
    </>
  );
}

function RealTime({match}){
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
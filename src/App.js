import React, { useState } from 'react';
import './App.scss';
import axios from 'axios';
import Resizer from 'react-image-file-resizer';
import WebcamCapture from './components/WebcamCapture';
import Results from './components/Results'
// axios.defaults.xsrfCookieName = "csrftoken";
// axios.defaults.xsrfHeaderName = "X-CSRFToken";
// const token = `${'njys'}:${'1q2w3e4r!'}`;
// const encodedToken = Buffer.from(token).toString('base64');
// const headers = { 'Authorization': 'Basic '+ encodedToken };

// const api = axios.create({
//   baseURL: `https://boostcamp-nyjs.herokuapp.com/`,
//   // baseURL: `http://127.0.0.1:8000/`,
//   headers: headers
// })

function App() {
  const [img, setImage] = useState(null);
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

  // api test
  // api.get('/masks/')
  // .then(res =>{
  //     console.log(res)
  // })
  // .catch(e=>{
  //   console.log(e)
  // })
  
  const handleFileInput = async (event) => {
    setImage(event.target.files[0]);

    event.preventDefault();

    // 파일 읽기
    try {
      const file = event.target.files[0];
      let image = undefined;
      if (file){
        image = await resizer(file);
        setPreview(image)
      }
      //console.log(image)
    } catch (err) { 
      console.log(err) // debug
    }
  }

  const onClick = async () => {
    const json = JSON.stringify({
        name: "test100",
        image : previewURL,
        result: '-1'
    })
    try {
      const temp = await api.post('masks/', json);
      setResult (String(temp.data.result));
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }
  
  
  // image resizer
  const resizer = (file) => new Promise(resolve => {
    Resizer.imageFileResizer(
      file, 500, 500, 'JPEG', 100, 0,
      uri => {
        resolve(uri);
      },
      'base64',
    );
  });

  let profile_preview = <img className='profile_preview' src={previewURL} alt=""/>

  // webcam
  const camToggle = () => setCam(camState => !camState);

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
          <button className = "btn" onClick={onClick}>제출</button>
        </div>
    </div>
    </>
  );
}

export default App;
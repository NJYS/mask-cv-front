import { useRef, useCallback} from 'react';
import Webcam from 'react-webcam';

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };

const WebcamCapture = (props) => {
    const webcamRef = useRef(null);

    const capture = useCallback(
      () => {
        props.camToggle();
        const imageSrc = webcamRef.current.getScreenshot();
        console.log(imageSrc) // base64 image file
        props.setPreview(imageSrc)
      },
      [webcamRef]
    );

    return (
        
          <div>
          <Webcam
            audio={false}
            height={window.innerWidth>400 ? 300 : 300}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={window.innerWidth>400 ? 540 : 200}
            videoConstraints={videoConstraints}
          />
        <button onClick={capture}>Capture photo</button>
        <button onClick={() => props.camToggle()}>닫기</button>
        </div>
    )
}

export default WebcamCapture

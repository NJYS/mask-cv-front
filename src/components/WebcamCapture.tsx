import { useRef, useCallback} from 'react';
import Webcam from 'react-webcam';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';


const videoConstraints = {
    width: 512,
    height: 512,
    facingMode: "user"
  };

const WebcamCapture = (props : any) => {
    const webcamRef : React.MutableRefObject<any> = useRef<any>(null);
    const {camToggle, setPreview} = props;

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setPreview(imageSrc) // base64 image file
        camToggle();
      }, [webcamRef, camToggle, setPreview]);

    return (
          <>
            <Grid container direction="row" justify="center" alignItems="center">
              <Webcam
                audio={false}
                height={window.innerHeight> 1024? 512 : 256}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={window.innerHeight > 1024? 512: 256}
                videoConstraints={videoConstraints}
              />
            </Grid>
            <Grid container spacing={3} direction="row" alignItems="center" justify="center">
              <Grid item>
                <IconButton color="primary" aria-label="capture" component="span" onClick={capture}>
                  <PhotoCamera />
                </IconButton>
              </Grid>
              <Grid item>
                <Button variant="contained" size="small" color="primary" onClick={camToggle}>종료</Button>
              </Grid>
            </Grid>
        </>
    )
}

export default WebcamCapture

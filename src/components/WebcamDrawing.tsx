
import { useRef, useCallback} from 'react';
import Webcam from 'react-webcam';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

const videoConstraints = {
    width: 448,
    height: 448,
    facingMode: "user"
  };

const WebcamDrawing = (props : any) => {

    const webcamRef : React.MutableRefObject<any> = useRef<any>(null);
    const {camToggle, setPreview} = props;

    return (
        <>
          <Grid container justify="center" alignItems="center">
            <Webcam
              audio={false}
              height={window.innerHeight> 512? 448 : 256}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={window.innerHeight > 512? 448 : 256}
              videoConstraints={videoConstraints}
            />
          </Grid>
          <Box mt = "1rem"/>
      </>
  );
}

export default WebcamDrawing
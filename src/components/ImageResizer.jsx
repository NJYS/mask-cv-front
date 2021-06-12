import Resizer from 'react-image-file-resizer';

const ImageResizer = (file) => {
    return (
        new Promise(resolve => {
            Resizer.imageFileResizer(
              file, 500, 500, 'JPEG', 100, 0,
              uri => {
                resolve(uri);
              },
              'base64',
            );
          })
    );
}

export default ImageResizer

import Resizer from 'react-image-file-resizer';

const ImageResizer = (file : any) :Promise<string> => {
    return (
        new Promise(resolve => {
            Resizer.imageFileResizer(
              file, 500, 500, 'JPEG', 100, 0,
              uri => {
                resolve(uri.toString());
              },
              'base64',
            );
          })
    );
}

export default ImageResizer

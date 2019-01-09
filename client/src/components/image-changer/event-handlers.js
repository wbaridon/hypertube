import { dataURItoBlob } from './image-handle-functions';

function submitImageConvert() {
  const { image } = this.state;
  if (image.inputFile) {
    image.inputFile = dataURItoBlob(image.rawData);
  }
  // append('image', image.inputFile);
}

export default submitImageConvert;

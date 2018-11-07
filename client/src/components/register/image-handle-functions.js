import piexif from 'piexifjs';

function rotateCounterClockwise() {
  let { rotation } = this.state;
  const { imageFile } = this.state;
  if (rotation === 1) {
    rotation = 8;
  } else if (rotation === 8) {
    rotation = 3;
  } else if (rotation === 3) {
    rotation = 6;
  } else if (rotation === 6) {
    rotation = 1;
  } else if (rotation === 2) {
    rotation = 5;
  } else if (rotation === 5) {
    rotation = 4;
  } else if (rotation === 4) {
    rotation = 7;
  } else if (rotation === 7) {
    rotation = 2;
  }
  this.setState({ rotation }, () => this.handleImageAdd(imageFile));
}

function rotateClockwise() {
  let { rotation } = this.state;
  const { imageFile } = this.state;
  if (rotation === 8) {
    rotation = 1;
  } else if (rotation === 1) {
    rotation = 6;
  } else if (rotation === 6) {
    rotation = 3;
  } else if (rotation === 3) {
    rotation = 8;
  } else if (rotation === 2) {
    rotation = 7;
  } else if (rotation === 7) {
    rotation = 4;
  } else if (rotation === 4) {
    rotation = 5;
  } else if (rotation === 5) {
    rotation = 2;
  }
  this.setState({ rotation }, () => this.handleImageAdd(imageFile));
}

function flip() {
  let { rotation } = this.state;
  if (rotation === 1) {
    rotation = 2;
  } else if (rotation === 2) {
    rotation = 1;
  } else if (rotation === 8) {
    rotation = 7;
  } else if (rotation === 7) {
    rotation = 8;
  } else if (rotation === 6) {
    rotation = 5;
  } else if (rotation === 5) {
    rotation = 6;
  } else if (rotation === 3) {
    rotation = 4;
  } else if (rotation === 4) {
    rotation = 3;
  }
  const { imageFile } = this.state;
  this.setState({ rotation }, () => this.handleImageAdd(imageFile));
}

function handleImageAdd(image) {
  this.setState({ imageFile: image });
  let { rotation } = this.state;
  let { imageOffset } = this.state;
  if (!image) {
    return;
  }
  let exif;
  if (image.type.match(/image\/(?:jpg|jpeg|png|gif)/)) {
    this.reader.onload = (e) => {
      if (image.type.match(/image\/(?:jpg|jpeg)/)) {
        exif = piexif.load(e.target.result);
      } else {
        rotation = rotation !== 0 ? rotation : 1;
      }
      const img = new Image();
      img.onload = () => {
        const scaleWidth = 310 / img.width;
        const scaleHeight = 310 / img.height;

        const scale = Math.max(scaleWidth, scaleHeight);

        img.width *= scale; // 608
        img.height *= scale; // 550
        console.log(img.width, img.height);
        const orientation = rotation || exif['0th'][piexif.ImageIFD.Orientation];
        this.setState({ rotation: orientation, widthGreater: img.width >= img.height });
        console.log(orientation);
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        let x = 0;
        let y = 0;
        ctx.save();
        if (orientation === 2) {
          x = -canvas.width;
          ctx.scale(-1, 1);
        } else if (orientation === 3) {
          x = -canvas.width;
          y = -canvas.height;
          ctx.scale(-1, -1);
        } else if (orientation === 3) {
          x = -canvas.width;
          y = -canvas.height;
          ctx.scale(-1, -1);
        } else if (orientation === 4) {
          y = -canvas.height;
          ctx.scale(1, -1);
        } else if (orientation === 5) {
          canvas.width = img.height;
          canvas.height = img.width;
          ctx.translate(canvas.width, canvas.height / canvas.width);
          ctx.rotate(Math.PI / 2);
          y = -canvas.width;
          ctx.scale(1, -1);
        } else if (orientation === 6) {
          canvas.width = img.height;
          canvas.height = img.width;
          ctx.translate(canvas.width, canvas.height / canvas.width);
          ctx.rotate(Math.PI / 2);
        } else if (orientation === 7) {
          canvas.width = img.height;
          canvas.height = img.width;
          ctx.translate(canvas.width, canvas.height / canvas.width);
          ctx.rotate(Math.PI / 2);
          x = -canvas.height;
          ctx.scale(-1, 1);
        } else if (orientation === 8) {
          canvas.width = img.height;
          canvas.height = img.width;
          ctx.translate(canvas.width, canvas.height / canvas.width);
          ctx.rotate(Math.PI / 2);
          x = -canvas.height;
          y = -canvas.width;
          ctx.scale(-1, -1);
        }
        let imageYoffset = imageOffset;
        let imageXoffset = imageOffset;
        if (img.width > img.height) {
          imageYoffset = 0;
        } else {
          imageXoffset = 0;
        }
        ctx.drawImage(img, x + imageXoffset, y + imageYoffset, img.width, img.height);
        ctx.restore();

        const dataURL = canvas.toDataURL('image/jpeg', 1.0);
        this.setState({ image: dataURL, imageYoffset });
      };
      img.src = e.target.result;
    };
    this.reader.readAsDataURL(image);
  }
}

export {
  rotateClockwise,
  rotateCounterClockwise,
  flip,
  handleImageAdd,
};

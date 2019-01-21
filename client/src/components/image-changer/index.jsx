import React from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import {
  rotateClockwise,
  rotateCounterClockwise,
  flip,
  handleImageAdd,
  offsetY,
} from './image-handle-functions';
import ImageChangerDumb from './dumb';

class ImageChanger extends React.Component {
  constructor() {
    super();
    this.state = {
      image: {
        rawData: null,
        inputFile: null,
        verticalOffset: 0,
        isLandscape: true,
        orientation: 1,
        error: '',
      },
    };

    this.rotateCounterClockwise = rotateCounterClockwise.bind(this);
    this.rotateClockwise = rotateClockwise.bind(this);
    this.handleImageAdd = handleImageAdd.bind(this);
    this.flip = flip.bind(this);
    this.offsetY = offsetY.bind(this);
  }

  componentWillMount = async () => {
    const { imageUrl } = this.props;
    if (imageUrl) {
      const img = await Axios({
        method: 'get',
        responseType: 'blob',
        url: imageUrl,
        timeout: TIMEOUT_API,
      });
      this.handleImageAdd(img.data, false);
    }
  }

  render() {
    const {
      image,
    } = this.state;
    return (
      <ImageChangerDumb
        image={image}
        handleImageAdd={this.handleImageAdd}
        flip={this.flip}
        rotateClockwise={this.rotateClockwise}
        rotateCounterClockwise={this.rotateCounterClockwise}
        offsetY={this.offsetY}
      />
    );
  }
}

ImageChanger.propTypes = {
  imageUrl: PropTypes.string,
  handleImageChange: PropTypes.func.isRequired, // eslint-disable-line
};

ImageChanger.defaultProps = {
  imageUrl: null,
};

export default ImageChanger;

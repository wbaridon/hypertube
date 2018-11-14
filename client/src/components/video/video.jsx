import React from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import { withStyles } from '@material-ui/core/styles';

const styles = {

};

class Video extends React.Component {
  constructor() {
    super();
    this.state = {

    };
  }

  componentDidMount() {
    Axios.get('http://localhost:3000/videos/music.mp4', {

    }).then(() => {
      // Define video & audio formats
      const audioFormat = 'audio/mp4; codecs=mp4a.40.2';
      const videoFormat = 'video/mp4; codecs=avc1.64001e';

      function sourceOpen() {
        const mediaSource = this;
        const audioSourceBuffer = mediaSource.addSourceBuffer(audioFormat);
        const videoSourceBuffer = mediaSource.addSourceBuffer(videoFormat);
        fetch('http://localhost:3000/videos/music.mp4').then((response) => {
        // The data has to be a JavaScript ArrayBuffer
          return response.arrayBuffer();
        }).then((audioData) => {
          audioSourceBuffer.appendBuffer(audioData);
        });
        fetch('http://localhost:3000/videos/music.mp4').then((response) => {
        // The data has to be a JavaScript ArrayBuffer
          return response.arrayBuffer();
        }).then((videoData) => {
          videoSourceBuffer.appendBuffer(videoData);
        });
      }

      if ('MediaSource' in window && MediaSource.isTypeSupported(audioFormat) && MediaSource.isTypeSupported(videoFormat)) {
        const myMediaSource = new MediaSource();
        const url = URL.createObjectURL(myMediaSource);
        const videoTag = document.getElementById('videoPlayer');
        videoTag.src = url;
        console.log(myMediaSource.readyState);
        myMediaSource.addEventListener('sourceopen', sourceOpen);
      } else {
        console.error('woops...');
      }
    });
  }

  render() {
    return (
      <React.Fragment>
        <video id="videoPlayer" src="http://localhost:3000/videos/music.mp4" width="1280px" height="720px" controls>
          <track kind="captions" />
        </video>
      </React.Fragment>
    );
  }
}

Video.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

Video.url = '/video';
export default withStyles(styles)(Video);

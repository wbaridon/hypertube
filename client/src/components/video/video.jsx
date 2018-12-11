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
    var vidElement = document.getElementById('videoPlayer');

    if (window.MediaSource) {
      var mediaSource = new MediaSource();
      vidElement.src = URL.createObjectURL(mediaSource);
      mediaSource.addEventListener('sourceopen', sourceOpen);
    } else {
      console.log("The Media Source Extensions API is not supported.")
    }

    function sourceOpen(e) {
      console.log("coucou");
      URL.revokeObjectURL(vidElement.src);
      var mime = 'video/mp4; codecs="avc1.64000d,mp4a.40.2"';
      var mediaSource = e.target;
      var sourceBuffer = mediaSource.addSourceBuffer(mime);
      var videoUrl = 'http://localhost:3000/videos/music.mp4';
      fetch(videoUrl)
        .then(function(response) {
          return response.arrayBuffer();
        }).then(function(arrayBuffer) {
          sourceBuffer.addEventListener('updateend', function(e) {
            if (!sourceBuffer.updating && mediaSource.readyState === 'open') {
              mediaSource.endOfStream();
            }
          });
          sourceBuffer.appendBuffer(arrayBuffer);
        });
    }
  }

  render() {
    return (
      <React.Fragment>
        <video id="videoPlayer" width="1280px" height="720px" controls />
      </React.Fragment>
    );
  }
}

Video.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

Video.url = '/video';
export default withStyles(styles)(Video);

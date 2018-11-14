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

    }).then((result) => {
      console.log(result);
    });
    console.log(document.getElementById('videoPlayer'));
  }

  render() {
    const { patate } = this.state;

    return (
      <React.Fragment>
        <video id="videoPlayer" src="http://localhost:3000/videos/music.mp4" width="1280px" height="720px" controls>
        </video>
        <div>{`ma patateibale asdas ${patate}!`}</div>
      </React.Fragment>
    );
  }
}

Video.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

Video.url = '/video';
export default withStyles(styles)(Video);

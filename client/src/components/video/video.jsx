import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {

};

class Video extends React.Component {
  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    // const { classes } = this.props;

    return (
      <React.Fragment>
        <video id="videoPlayer" src="http://localhost:3000/videos/music.mp4" width="1280px" height="720px" controls>
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

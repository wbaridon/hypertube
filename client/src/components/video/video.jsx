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
        <video id="videoPlayer" width="1280px" height="720px" controls>
          <track kind="captions" />
          <source src="http://localhost:3000/video" type="video/mp4" />
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

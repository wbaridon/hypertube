import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import * as qs from 'query-string';


const styles = {

};

class Video extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoHash: qs.parse(props.location.search, { ignoreQueryPrefix: true }).videoHash,
    };
  }

  render() {
    const { videoHash } = this.state;
    return (
      <React.Fragment>
        <video id="videoPlayer" controls muted>
          <source src={`http://localhost:3000/video?videoHash=${videoHash}`} />
          <track kind="captions" default />
        </video>
      </React.Fragment>
    );
  }
}

Video.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
};

Video.url = '/video';
export default withRouter(withStyles(styles)(Video));

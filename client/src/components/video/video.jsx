import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import * as qs from 'query-string';
import { connect } from 'react-redux';
import { sendHashA } from 'Actions';

const styles = {

};

class Video extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoHash: qs.parse(props.location.search, { ignoreQueryPrefix: true }).videoHash,
    };
    const {
      sendHash,
      hash,
    } = this.props;
    console.log(hash.hash);
    sendHash(hash.hash);
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
  sendHash: PropTypes.func.isRequired,
  hash: PropTypes.string.isRequired,
  classes: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
};

const mapDispatchToProps = dispatch => ({
  sendHash: hash => dispatch(sendHashA(hash)),
});

const mapStateToProps = state => ({
  hash: state.movie.data.torrents[0],
});

Video.url = '/video';
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(Video)));
// export default connect(mapStateToProps, mapDispatchToProps)(Video);

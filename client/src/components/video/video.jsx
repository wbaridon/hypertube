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
    const {
      hash,
    } = this.props;
    console.log(hash.hash);
  }

  componentDidMount() {
    document.getElementById('videoPlayer').play();
  }

  render() {
    return (
      <React.Fragment>
        <video id="videoPlayer" controls muted preload="auto">
          <source src={`http://localhost:3000/video?videoHash=${this.props.hash.hash}`} />
          <track kind="captions" default />
        </video>
      </React.Fragment>
    );
  }
}

Video.propTypes = {
  hash: PropTypes.string.isRequired,
  classes: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  hash: state.movie.data.torrents[0],
});

Video.url = '/video';
export default connect(mapStateToProps)(withRouter(withStyles(styles)(Video)));
// export default connect(mapStateToProps, mapDispatchToProps)(Video);

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
  }

  componentDidMount() {
    const { movieSeen, idMovie, token } = this.props;
    const vid = document.getElementById('videoPlayer');
    vid.oncanplay = () => {
      vid.play();
    };
    const videoListener = document.getElementById('videoPlayer');
    videoListener.onended = () => {
      movieSeen(token, idMovie);
    };
  }

  componentWillUnmount() {
    document.getElementById('videoPlayer').pause();
  }


  render() {
    const {
      hash,
      subtitles,
      idMovie,
    } = this.props;
    return (
      <React.Fragment>
        <video id="videoPlayer" crossOrigin="anonymous" controls muted preload="auto" style={{ margin: 'auto', width: '100%' }}>
          <source src={`http://localhost:3000/video?videoHash=${hash}&id=${idMovie}`} />
          {subtitles.fr ? <track label="French" kind="subtitles" srcLang="fr" src={`http://localhost:3000/subtitles/${idMovie}-fr.vtt`} /> : null}
          {subtitles.en ? <track label="English" kind="subtitles" srcLang="en" src={`http://localhost:3000/subtitles/${idMovie}-en.vtt`} /> : null}
          <track kind="captions" default />
        </video>
      </React.Fragment>
    );
  }
}

Video.propTypes = {
  token: PropTypes.string.isRequired,
  movieSeen: PropTypes.func.isRequired,
  hash: PropTypes.string.isRequired,
  idMovie: PropTypes.string.isRequired,
  classes: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
  subtitles: PropTypes.shape([]).isRequired,
};

const mapStateToProps = state => ({
  token: state.user.token,
  // hash: state.movie.data.torrents[0],
});

Video.url = '/video';
export default connect(mapStateToProps)(withRouter(withStyles(styles)(Video)));
// export default connect(mapStateToProps, mapDispatchToProps)(Video);

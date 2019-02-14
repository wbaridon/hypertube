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
    console.log(hash);
  }

  componentDidMount() {
    document.getElementById('videoPlayer').play();
  }

  render() {
    const {
      hash,
      subtitles,
      idMovie,
    } = this.props;
    console.log(subtitles);
    return (
      <React.Fragment>
        <video id="videoPlayer" crossOrigin="anonymous" controls muted preload="auto" style={{ margin: 'auto', width: '100%' }} >
          {<source src={`http://localhost:3000/video?videoHash=${hash}&id=${idMovie}`} /> }
          {/* Tester si le fichier est accessible pour mettre le lien la ou pas Et traduire label suivant langue */}
          {subtitles.length !== 0 ? (
            <div>
              <track label="French" kind="subtitles" srcLang="fr" src={`http://localhost:3000/subtitles/${idMovie}-fr.vtt`} />
              <track label="English" kind="subtitles" srcLang="en" src={`http://localhost:3000/subtitles/${idMovie}-en.vtt`} />
              <track kind="captions" default />
            </div>
          ) : (
            null
          )}
        </video>
      </React.Fragment>
    );
  }
}

Video.propTypes = {
  hash: PropTypes.string.isRequired,
  idMovie: PropTypes.string.isRequired,
  classes: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
  subtitles: PropTypes.shape([]).isRequired,
};

const mapStateToProps = state => ({
  // hash: state.movie.data.torrents[0],
});

Video.url = '/video';
export default connect(mapStateToProps)(withRouter(withStyles(styles)(Video)));
// export default connect(mapStateToProps, mapDispatchToProps)(Video);

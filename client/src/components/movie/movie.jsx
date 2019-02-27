import React from 'react';
import PropTypes from 'prop-types';
import {
  getMovieDataA,
  getSubtitlesA,
  movieSeenA,
  movieUnseenA,
  emptyMovieDataA,
} from 'Actions';
import { Link, withRouter } from 'react-router-dom';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
} from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {
  injectIntl,
  intlShape,
  FormattedMessage,
} from 'react-intl';
import Comments from './comments';
import Video from '../video/video';
import GrowShrink from '../grow-shrink';

const styles = {
  movie_info: {
    margin: 'auto',
    width: '100%',
    padding: 0,
  },
  info_container: {
    display: 'flex',
    alignItems: 'center',
  },
};


class Movie extends React.Component {
  constructor() {
    super();
    this.state = {
      seen: null,
    };
  }

  componentWillMount() {
    const {
      token,
      getMovie,
      match,
      getSubtitles,
    } = this.props;
    getMovie(match.params.id_movie, token);
    getSubtitles(match.params.id_movie, token);
  }

  componentWillUnmount = () => {
    const { emptyMovieData } = this.props;
    emptyMovieData();
  }

  handleSeen(token, idMovie, isSeen) {
    const { movieSeen, movieUnseen } = this.props;
    this.setState({ seen: isSeen });
    if (isSeen) {
      movieSeen(token, idMovie);
    } else {
      movieUnseen(token, idMovie);
    }
  }

  render() {
    const {
      movieSeen,
      classes,
      movie,
      token,
      intl,
      location,
      subtitles,
    } = this.props;
    const { seen } = this.state;
    if (movie && movie.error === true) {
      return (
        <Grid>
          <IconButton disableRipple={false} component={Link} to="/movies">
            <ArrowBack />
          </IconButton>
          <Typography variant="h3"><FormattedMessage id="movie.error" /></Typography>
        </Grid>
      );
    }
    return (
      movie ? (
        <Grid
          container
          className={classes.movie_info}
          spacing={8}
          justify="center"
          alignItems="center"
        >
          <Card>
            <Grid>
              <IconButton disableRipple={false} component={Link} to="/movies">
                <ArrowBack />
              </IconButton>
              {seen ? (
                <IconButton onClick={() => this.handleSeen(token, movie.imdbId, false)} style={{ borderRadius: '15%', float: 'right', marginRight: '10px' }}>
                  <Typography><FormattedMessage id="movie.markUnseen" /></Typography>
                  <CloseIcon />
                </IconButton>
              ) : (
                <IconButton onClick={() => this.handleSeen(token, movie.imdbId, true)} style={{ borderRadius: '15%', float: 'right', marginRight: '10px' }}>
                  <DoneIcon />
                  <Typography><FormattedMessage id="movie.markSeen" /></Typography>
                </IconButton>
              )}
            </Grid>
            <Grid container>
              <Grid item xs={12} sm={6}>
                <CardMedia
                  style={
                    {
                      width: '70%', maxWidth: '500px', margin: '20px',
                    }
                  }
                  title={`${movie.title} image`}
                  component="img"
                  image={movie.cover}
                />
              </Grid>
              <Grid item xs={12} sm={6} style={{ display: 'flex' }}>
                <CardContent style={{ margin: 'auto' }}>
                  <Typography variant="h5">{movie.title}</Typography>
                  <Typography variant="subtitle1">{movie.synopsis}</Typography>
                  {
                    movie.year ? (
                      <div>
                        <br />
                        <Typography inline variant="h5"><FormattedMessage id="movie.year" /></Typography>
                        <Typography inline variant="subtitle1">{movie.year}</Typography>
                      </div>
                    ) : (null)
                  }
                  {
                    movie.genre > 0 ? (
                      <div>
                        <br />
                        <Typography inline variant="h5"><FormattedMessage id="movie.genre" /></Typography>
                        <Typography inline variant="subtitle1">{`${movie.genre}`}</Typography>
                      </div>
                    ) : (null)
                  }
                  {
                    movie.director ? (
                      <div>
                        <br />
                        <Typography inline variant="h5"><FormattedMessage id="movie.director" /></Typography>
                        <Typography inline variant="subtitle1">{movie.director}</Typography>
                      </div>
                    ) : (null)
                  }
                  {
                    movie.actors ? (
                      <div>
                        <br />
                        <Typography inline variant="h5"><FormattedMessage id="movie.actors" /></Typography>
                        <Typography inline variant="subtitle1">{`${movie.actors}`}</Typography>
                      </div>
                    ) : (null)
                  }
                  {
                    movie.imdbRating ? (
                      <div>
                        <br />
                        <Typography inline variant="h5"><FormattedMessage id="movie.rating" /></Typography>
                        <Typography inline variant="subtitle1">{movie.imdbRating}</Typography>
                      </div>
                    ) : (null)
                  }
                </CardContent>
              </Grid>
            </Grid>
            <Grid>
              {subtitles ? (
                <Video hash={movie.torrents[0].hash} idMovie={movie.imdbId} subtitles={subtitles} movieSeen={movieSeen} />
              ) : (
                null
              )}
            </Grid>
          </Card>
          <Comments comments={movie.comments} idMovie={movie.imdbId} />
        </Grid>
      ) : (
        <GrowShrink movieName={location.state ? location.state.movieName : intl.formatMessage({ id: 'movie.loading' })} />
      )
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getMovie: (idMovie, token) => dispatch(getMovieDataA(idMovie, token)),
  movieSeen: (token, idMovie) => dispatch(movieSeenA(token, idMovie)),
  movieUnseen: (token, idMovie) => dispatch(movieUnseenA(token, idMovie)),
  emptyMovieData: () => dispatch(emptyMovieDataA()),
  getSubtitles: (idMovie, token) => dispatch(getSubtitlesA(idMovie, token)),
});

const mapStateToProps = state => ({
  movie: state.movie.data,
  token: state.user.token,
  subtitles: state.movie.subtitles,
});

Movie.propTypes = {
  token: PropTypes.string.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id_movie: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  location: PropTypes.shape({}).isRequired,
  subtitles: PropTypes.shape({}),
  classes: PropTypes.shape({}).isRequired,
  getMovie: PropTypes.func.isRequired,
  movieSeen: PropTypes.func.isRequired,
  movieUnseen: PropTypes.func.isRequired,
  emptyMovieData: PropTypes.func.isRequired,
  getSubtitles: PropTypes.func.isRequired,
  movie: PropTypes.shape({}),
  intl: intlShape.isRequired,
};

Movie.defaultProps = {
  movie: null,
  subtitles: null,
};

Movie.url = '/movie/:id_movie';
export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter((Movie)))));

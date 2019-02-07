import React from 'react';
import PropTypes from 'prop-types';
import { getMovieDataA, seenA, unseenA } from 'Actions';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Comments from './comments';
import Video from '../video/video';

const styles = {
  movie_info: {
    margin: 'auto',
  },
  info_container: {
    display: 'flex',
    alignItems: 'center',
  },
};

class Movie extends React.Component {
  componentWillMount() {
    const {
      token,
      getMovie,
      match,
    } = this.props;
    getMovie(match.params.id_movie, token);
  }

  render() {
    const { classes, movie, token, seen, unseen, } = this.props;
    // console.log(movie);
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
            <Grid container>
              <IconButton onClick={() => seen(token, movie.imdbId)}>
                seen
              </IconButton>
              <IconButton onClick={() => unseen(token, movie.imdbId)}>
                unseen
              </IconButton>
              <Grid item xs={12} sm={6}>
                <IconButton component={Link} to="/movies">
                  <ArrowBack />
                </IconButton>
                <CardMedia
                  style={
                    {
                      margin: 'auto', width: '70%', maxWidth: '500px', marginBottom: '20px'
                    }
                  }
                  title="movie cover"
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
                     movie.length > 0 ? (
                       <div>
                         <br />
                         <Typography inline variant="h5"><FormattedMessage id="movie.genre" /></Typography>
                         <Typography inline variant="subtitle1">{movie.genre + ' '}</Typography>
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
                    movie.actors.length > 0 ? (
                      <div>
                        <br />
                        <Typography inline variant="h5"><FormattedMessage id="movie.actors" /></Typography>
                        <Typography inline variant="subtitle1">{movie.actors + ' '}</Typography>
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
          </Card>
          {/* <Video /> */}
          <Comments comments={movie.comments} idMovie={movie.imdbId} />
        </Grid>
      ) : (
        <Grid>
          <Typography>Nop</Typography>
        </Grid>
      )
    );
  }
}

Movie.propTypes = {
  token: PropTypes.string.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id_movie: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  classes: PropTypes.shape({}).isRequired,
  getMovie: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  getMovie: (idMovie, token) => dispatch(getMovieDataA(idMovie, token)),
  seen: (token, idMovie) => dispatch(seenA(token, idMovie)),
  unseen: (token, idMovie) => dispatch(unseenA(token, idMovie)),
});

const mapStateToProps = state => ({
  movie: state.movie.data,
  token: state.user.token,
});

Movie.url = '/movie/:id_movie';
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Movie));

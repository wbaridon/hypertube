import React from 'react';
import PropTypes from 'prop-types';
import { getMovieDataA } from 'Actions';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Comments from './comments';

const styles = {
  movie_info: {
    // width: '100%',
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
      getMovie,
    } = this.props;
    const {match } = this.props;
    getMovie(match.params.id_movie);
  }

  render() {
    const  { classes, movie } = this.props;
    console.log(movie);
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
              <Grid item xs={12} sm={6}>  
                <CardContent>
                  <Typography variant="h5">{movie.title}</Typography>
                  <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="h5">Synopsis</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <Typography inline variant="subtitle1">
                        {movie.synopsis}
                      </Typography>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                  <Typography variant="subtitle1"></Typography>
                  <Typography inline variant="h5"><FormattedMessage id="movie.year" /></Typography>
                  <Typography inline variant="subtitle1">{movie.year}</Typography>
                  <br />
                  <Typography inline variant="h5"><FormattedMessage id="movie.runtime" /></Typography>
                  <Typography inline variant="subtitle1">{movie.runtime}</Typography>
                  <br />
                  <Typography inline variant="h5"><FormattedMessage id="movie.genre" /></Typography>
                  <Typography inline variant="subtitle1">{movie.genre}</Typography>
                  <br />
                  <Typography inline variant="h5"><FormattedMessage id="movie.director" /></Typography>
                  <Typography inline variant="subtitle1">{movie.director}</Typography>
                  <br />
                  <Typography inline variant="h5"><FormattedMessage id="movie.actors" /></Typography>
                  <Typography inline variant="subtitle1">{movie.actors}</Typography>
                  <br />
                  <Typography inline variant="h5"><FormattedMessage id="movie.awards" /></Typography>
                  <Typography inline variant="subtitle1">{movie.awards}</Typography>
                  <br />
                  <Typography inline variant="h5"><FormattedMessage id="movie.rating" /></Typography>
                  <Typography inline variant="subtitle1">{movie.imdbRating}</Typography>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
          <Grid container item xs={12} justify="center">
            <Comments comments={movie.comments} />
          </Grid>
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
  match: PropTypes.shape({
    params: PropTypes.shape({
      id_movie: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const mapDispatchToProps = dispatch => ({
  getMovie: idMovie => dispatch(getMovieDataA(idMovie)),
});

const mapStateToProps = state => ({
  movie: state.movie.data,
});

Movie.url = '/movie/:id_movie';
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Movie));

import React from 'react';
import PropTypes from 'prop-types';
import { getMovieDataA } from 'Actions';
import {Link as RouterLink} from 'react-router-dom';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
} from '@material-ui/core';
import { connect } from 'react-redux';
import Comments from './comments';
import { withStyles } from '@material-ui/core/styles';

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
      idMovie,
      getMovie,
    } = this.props;
    const {match } = this.props;
    getMovie(match.params.id_movie);
  }

  render() {
    const comments = [
      {
        username: 'abc',
        comment: 'love this movie',
        timestamp: 20410242221,
      },
      {
        username: 'abc',
        comment: 'love this movie too wow what a coincidence. Specialy the part of the goat licking acidic water and then going into total madness. Trying to fight everything. ',
        timestamp: 204101231232,
      }, {
        username: 'efg',
        comment: 'love this movie as well lol',
        timestamp: 20410242241,
      },
    ];
    const  { classes, movie, } = this.props;
    console.log(movie);
    return (
      movie ? (
          <Grid container 
          className={classes.movie_info}
          spacing={8}
          justify='center'
          alignItems='center'
          >
            <Card>
              <Grid container>
                <Grid item xs={12} sm={6}>
                  <Button component={RouterLink} to="/movies">
                  Go back
                  </Button>
                  <CardMedia
                    style={{margin:'auto', width: '70%', maxWidth:'500px', marginBottom:'20px'}}
                    title="movie cover"
                    component='img'
                    image={movie.cover}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>  
                  <CardContent>
                    <Typography variant="h5">{movie.title}</Typography>
                    <Typography variant="subtitle1">{movie.synopsis}</Typography>
                    <Typography inline={true} variant="h5">Sortie: </Typography>
                    <Typography inline={true} variant="subtitle1">{movie.year}</Typography>
                    <br></br>
                    <Typography inline={true} variant="h5">Durée: </Typography>
                    <Typography inline={true} variant="subtitle1">{movie.runtime}</Typography>
                    <br></br>
                    <Typography inline={true} variant="h5">Genre: </Typography>
                    <Typography inline={true} variant="subtitle1">{movie.genre}</Typography>
                    <br></br> 
                    <Typography inline={true} variant="h5">Rélisateur: </Typography>
                    <Typography inline={true} variant="subtitle1">{movie.director}</Typography>
                    <br></br>
                    <Typography inline={true} variant="h5">Acteurs: </Typography>
                    <Typography inline={true} variant="subtitle1">{movie.actors}</Typography>
                    <br></br>
                    <Typography inline={true} variant="h5">Langues: </Typography>
                    <Typography inline={true} variant="subtitle1">{movie.title}</Typography>
                    <br></br>
                    <Typography inline={true} variant="h5">Pays: </Typography>
                    <Typography inline={true} variant="subtitle1">{movie.title}</Typography>
                    <br></br>
                    <Typography inline={true} variant="h5">Prix: </Typography>
                    <Typography inline={true} variant="subtitle1">{movie.awards}</Typography>
                    <br></br>
                    <Typography inline={true} variant="h5">Note: </Typography>
                    <Typography inline={true} variant="subtitle1">{movie.imdbRating}</Typography>
                  </CardContent>
                </Grid>
              </Grid>
            </Card>
            <Grid container item xs={9} justify="center">
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
  getMovie: (idMovie) => dispatch(getMovieDataA(idMovie)),
});

const mapStateToProps = state => ({
  movie: state.movie.data,
});

Movie.url = '/movie/:id_movie';
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Movie));

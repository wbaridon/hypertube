import React from 'react';
import PropTypes from 'prop-types';
import { getMovieDataA } from 'Actions';
import {
  Typography,
  Grid,
  GridListTile,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
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
    console.log(movie.data);
    return (
      movie ? (
          <Grid container 
          className={classes.movie_info}
          spacing={8}
          direction='collumn'
          justify='center'
          alignItems='center'
          >
            <Card>
              <CardMedia
                style={{margin:'auto', width: '70%'}}
                title="movie cover"
                component='img'
                image="https://m.media-amazon.com/images/M/MV5BZDZhOGJiOTUtNjIxOS00MWZiLWFiZWUtMTYzZThmNGYwNmI0XkEyXkFqcGdeQXVyNTcwMzkyNDE@._V1_SX300.jpg"
                />
              <CardContent>
                <div className={classes.info_container}>
                  <Typography component="h6" variant="h6">Titre:</Typography>
                  <Typography>Landmine Goes Click</Typography>
                </div>
                <div className={classes.info_container}>
                <Typography component="h6" variant="h6">Année: </Typography>
                <Typography>2015</Typography>
                </div>
                <div className={classes.info_container}>
                <Typography component="h6" variant="h6">Durée:</Typography>
                <Typography>105 min</Typography>
                </div>
                <div className={classes.info_container}>
                <Typography component="h6" variant="h6">Genre:</Typography>
                <Typography>Action, Crime, Drama, Thriller</Typography>
                </div>
                <div className={classes.info_container}>
                <Typography component="h6" variant="h6">Rélisateur:</Typography>
                <Typography>Levan Bakhia</Typography>
                </div>
                <div className={classes.info_container}>
                <Typography component="h6" variant="h6">Acteurs:</Typography>
                <Typography>Sterling Knight, Spencer Locke, Dean Geyer, Kote Tolordava</Typography>
                </div>
                <div className={classes.info_container}>
                <Typography component="h6" variant="h6">Synopsis:</Typography>
                <Typography>Trapped standing on an armed landmine, an American tourist is forced to watch helplessly while his girlfriend is terrorized and brutally assaulted.</Typography>
                </div>
                <div className={classes.info_container}>
                <Typography component="h6" variant="h6">Langue:</Typography>
                <Typography>English, Georgian, Russian</Typography>
                </div>
                <div className={classes.info_container}>
                <Typography component="h6" variant="h6">Pays:</Typography>
                <Typography>Georgia</Typography>
                </div>
                <div className={classes.info_container}>
                <Typography component="h6" variant="h6">Prix:</Typography>
                <Typography>7 wins & 4 nominations.</Typography>
                </div>
                <div className={classes.info_container}>
                <Typography component="h6" variant="h6">Note:</Typography>
                <Typography>Internet movie database :6.0/10.......</Typography>
                </div>
              </CardContent>
            </Card>
          <Grid>
            <Comments comments={comments} />
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
  movie: state.movie,
});

Movie.url = '/movie/:id_movie';
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Movie));

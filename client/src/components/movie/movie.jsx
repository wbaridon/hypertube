import React from 'react';
import PropTypes from 'prop-types';
import { getMovieDataA } from 'Actions';
import {
  Typography,
  Grid,
  GridListTile,
} from '@material-ui/core';
import { connect } from 'react-redux';
import Comments from './comments';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  movie_info: {
    width: '70%',
    margin: 'auto',
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
        comment: 'love this movie too wow what a coincidence',
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
        <div>
          <Grid container 
          className={classes.movie_info}
          spacing={8}
          direction='row'
          justify='center'
          alignItems='center'>
            <Grid item xs sm={5}>
              <GridListTile >
                <img src="https://m.media-amazon.com/images/M/MV5BZDZhOGJiOTUtNjIxOS00MWZiLWFiZWUtMTYzZThmNGYwNmI0XkEyXkFqcGdeQXVyNTcwMzkyNDE@._V1_SX300.jpg"/>
              </GridListTile>
            </Grid>
            <Grid item xs sm={5}>
              <Typography>Landmine Goes Click</Typography>
              <Typography>Année: 2015</Typography>
              <Typography>Durée: 105 min</Typography>
              <Typography>Genre: Action, Crime, Drama, Thriller</Typography>
              <Typography>Rélisateur: Levan Bakhia</Typography>
              <Typography>Acteurs: Sterling Knight, Spencer Locke, Dean Geyer, Kote Tolordava</Typography>
              <Typography>Synopsis: Trapped standing on an armed landmine, an American tourist is forced to watch helplessly while his girlfriend is terrorized and brutally assaulted.</Typography>
              <Typography>Language: English, Georgian, Russian</Typography>
              <Typography>Country: Georgia</Typography>
              <Typography>Awards: 7 wins & 4 nominations.</Typography>
              <Typography>Note: Internet movie database :6.0/10.......</Typography>
            </Grid>
          </Grid>
          <Grid>
            <Comments comments={comments} />
          </Grid>
        </div>
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

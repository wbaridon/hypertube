import React from 'react';
import PropTypes from 'prop-types';
import { getMovieDataA } from 'Actions';
import {
  Typography,
  Grid,
} from '@material-ui/core';
import { connect } from 'react-redux';
import Comments from './comments';

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
    const  { movie, } = this.props;
    return (
      movie ? (
        <Grid>
        <Typography>Success !</Typography>
        <Comments comments={comments} />
        </Grid>
      ) : (
        <Grid>
        <Typography>error</Typography>
        <Comments comments={comments} />
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
  // movie: state.movie.data,
});

Movie.url = '/movie/:id_movie';
export default connect(mapStateToProps, mapDispatchToProps)(Movie);

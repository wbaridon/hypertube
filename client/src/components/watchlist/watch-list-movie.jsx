import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Grid,
  Paper,
  Button,
  TableRow,
  TableCell,

} from '@material-ui/core';
import { connect } from 'react-redux';
import { getMovieDataA, seenA, unseenA } from 'Actions';
import { Link } from 'react-router-dom';
import LoadingDots from '../loading-dots';


class WatchListMovie extends React.Component {
  constructor(props) {
    super(props);

    const {
      idMovie,
      updateWatchList,
      token,
    } = this.props;
    updateWatchList(idMovie, token);
  }

  render() {
    const {
      token,
      idMovie,
      movie,
      seen,
      unseen,
    } = this.props;
    // console.log(movie);
    return (
      movie ? (
        <TableRow key={idMovie}>
          <TableCell>
            <Typography noWrap>{movie.title}</Typography>
            
          </TableCell>
          <TableCell>
            {movie.seen ? (
              <Button onClick={() => unseen(token, movie.imdbId)}>
                <Typography noWrap>mark as unseen</Typography>
              </Button>
            ) : (
              <Button onClick={() => seen(token, movie.imdbId)}>
                <Typography noWrap>mark as seen</Typography>
              </Button>
            )}
          </TableCell>
          <TableCell>
            <Button component={Link} to={`/movie/${idMovie}`}>
              <Typography variant="button" noWrap>
                watch now
              </Typography>
            </Button>
          </TableCell>

        </TableRow>
      ) : (
        <LoadingDots />
      )
    );
  }
}
const mapDispatchToProps = dispatch => ({
  getMovie: (idMovie, token) => dispatch(getMovieDataA(idMovie, token)),
  seen: (token, idMovie) => dispatch(seenA(token, idMovie)),
  unseen: (token, idMovie) => dispatch(unseenA(token, idMovie)),
});

const mapStateToProps = state => ({
  movie: state.movie.data,
});

WatchListMovie.propTypes = {
  movie: PropTypes.shape({}).isRequired,
  updateWatchList: PropTypes.func.isRequired,
  seen: PropTypes.func.isRequired,
  unseen: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  idMovie: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WatchListMovie);

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
import { seenA, unseenA } from 'Actions';
import { Link } from 'react-router-dom';
import LoadingDots from '../loading-dots';


class WatchListMovie extends React.Component {
  constructor(props) {
    super(props);

    const {
      updateWatchList,
      idMovie,
      token,
      watchList,
    } = this.props;

    // watchList ? (
    //   watchList.map(movie => updateWatchList(movie.id, token))
    // ) :  (null);
  }

  render() {
    const {
      moviesData,
      token,
      idMovie,
      seen,
      unseen,
    } = this.props;
    let tab;
    moviesData ? (tab = moviesData) : (tab = [])

    // console.log(tab);
    return (
      tab.length !== 0 ? (
        tab.map(movie => (
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
        ))
      ) : (
        null
      )
    );
  }
}
const mapDispatchToProps = dispatch => ({
  seen: (token, idMovie) => dispatch(seenA(token, idMovie)),
  unseen: (token, idMovie) => dispatch(unseenA(token, idMovie)),
});

const mapStateToProps = state => ({
  moviesData: state.watchList.moviesData,
});

WatchListMovie.propTypes = {
  // moviesData: PropTypes.shape({}).isRequired,
  updateWatchList: PropTypes.func.isRequired,
  seen: PropTypes.func.isRequired,
  unseen: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  // idMovie: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WatchListMovie);

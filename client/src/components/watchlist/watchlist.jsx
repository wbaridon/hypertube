import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  TableRow,
  Table,
  TableBody,
  Paper,
} from '@material-ui/core';
import { connect } from 'react-redux';
import {
  getWatchListA,
  deleteWatchListA,
  updateWatchListA,
} from 'Actions';
import WatchListMovie from './watch-list-movie';
import LoadingDots from '../loading-dots';


class WatchList extends React.Component {
  componentWillMount() {
    const {
      getWatchList,
      token,
      watchList,
    } = this.props;
    console.log(token);
    getWatchList(token);
    // watchList ? (
    //   watchList.map(movie => (
    //     updateWatchList(movie.imdbId, token),
    //     console.log(movie)
    //   ))
    // ) : (null);
  }

  render() {
    const {
      token,
      watchList,
      updateWatchList,
    } = this.props;
    console.log(watchList);
    return (
      <Paper>
        <Typography variant="title">
          Watchlist
        </Typography>
        <br />
        <Typography variant="subtitle1">
          Quels films dois tu regarder ?
        </Typography>
        <Table>
          <TableBody>
            {
              watchList ? (
                watchList.map(movie => <WatchListMovie token={token} idMovie={movie.id} updateWatchList={updateWatchList} />)
              ) : <LoadingDots />
            }
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

WatchList.propTypes = {
  token: PropTypes.string.isRequired,
  getWatchList: PropTypes.func.isRequired,
  watchList: PropTypes.shape({}).isRequired,
  updateWatchList: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  updateWatchList: (idMovie, token) => dispatch(updateWatchListA(idMovie, token)),
  getWatchList: token => dispatch(getWatchListA(token)),
  deleteWatchList: (token, idMovie) => dispatch(deleteWatchListA(token, idMovie)),
});

const mapStateToProps = state => ({
  token: state.user.token,
  watchList: state.watchList.data,
});

WatchList.url = '/watchlist';
export default connect(mapStateToProps, mapDispatchToProps)(WatchList);
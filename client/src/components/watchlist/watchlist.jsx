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
    getWatchList(token);
   
  }

  render() {
    const {
      token,
      watchList,
      updateWatchList,
      moviesData,
    } = this.props;
    // watchList ? (
    //   watchList.map(movie => (
    //     updateWatchList(movie.imdbId, token),
    //     console.log(movie)
    //   ))
    //   // this.setState({watchList.data: ''})
    // ) : (null);
    console.log(watchList);
    return (
      <Paper>
        <Typography variant="h5">
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
                <WatchListMovie watchList={watchList} token={token} updateWatchList={updateWatchList} />
              ) : (
                null
              )
            }
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateWatchList: (idMovie, token) => dispatch(updateWatchListA(idMovie, token)),
  getWatchList: token => dispatch(getWatchListA(token)),
  deleteWatchList: (token, idMovie) => dispatch(deleteWatchListA(token, idMovie)),
});

const mapStateToProps = state => ({
  token: state.user.token,
  watchList: state.watchList.data,
  // moviesData: state.watchList.moviesData,
});

WatchList.propTypes = {
  // watchList: PropTypes.shape({}).isRequired,
  token: PropTypes.string.isRequired,
  getWatchList: PropTypes.func.isRequired,
  updateWatchList: PropTypes.func.isRequired,
};

WatchList.url = '/watchlist';
export default connect(mapStateToProps, mapDispatchToProps)(WatchList);
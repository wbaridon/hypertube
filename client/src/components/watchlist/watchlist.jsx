import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
} from '@material-ui/core';
import { connect } from 'react-redux';
import {
  getWatchListA,
  deleteWatchListA,
} from 'Actions';
import DumbWatchlist from './dumb';
import MovieCard from '../movies/movie-card';

class WatchList extends React.Component {
  componentWillMount() {
    const {
      getWatchList,
      token,
    } = this.props;
    console.log(token);
    getWatchList(token);
  }

  render() {
    const {
      watchList,
    } = this.props;
    console.log(watchList);
    return (
      <Grid>
        <Typography variant="h2">
          Watchlist
        </Typography>
        <br />
        <Typography variant="h3">
          Quels films dois tu regarder ?
        </Typography>
        {
          watchList ? (
            <Grid>
              <DumbWatchlist watchList={watchList} />
            </Grid>
          ) : (null)
        }
      </Grid> 
    );
  }
}

WatchList.PropTypes = {
  token: PropTypes.string.isRequired,
  getWatchList: PropTypes.func.isRequired,
  watchList: PropTypes.shape({
  }).isRequired,
};

const mapDispatchToProps = dispatch => ({
  getWatchList: token => dispatch(getWatchListA(token)),
  deleteWatchList: (token, idMovie) => dispatch(deleteWatchListA(token, idMovie)),
});

const mapStateToProps = state => ({
  watchList: state,
  token: state.user.token,
  watchList: state.watchList.data,
});

WatchList.url = '/watchlist';
export default connect(mapStateToProps, mapDispatchToProps)(WatchList);
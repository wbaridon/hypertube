import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Grid,
  TableCell,
  Button,
  Typography,
  TableRow,
  Table,
  TableBody,
  Paper,
  Avatar,
  CardMedia,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  seenA,
  unseenA,
  getWatchListA,
  deleteWatchListA,
} from 'Actions';

class WatchList extends React.Component {
  componentWillMount() {
    const {
      getWatchList,
      token,
    } = this.props;
    getWatchList(token);
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps);
  }

  render() {
    const {
      token,
      watchList,
      unseen,
      seen,
      deleteWatchList,
    } = this.props;
    console.log(watchList);
    return (
      <Paper >
        <Typography variant="h5">
          Watchlist
        </Typography>
        <br />
        <Typography variant="subtitle1">
          Quels films dois tu regarder ?
        </Typography>
          <Grid container direction="colummn" style={{flexFlow:"column"}} >
            {
              watchList ? (
                watchList.map(movie => (
                  <Paper style={{margin: '15px'}}>
                    <Grid item container direction="row" style={{flexFlow: 'row'}}>
                      <img style={{maxHeight:'140px', width:'auto', height:'auto', marginRight: '15px'}} src={movie.cover} />
                      <Grid item container direction="row" alignItems="center" justify="space-evenly" key={movie.imdbId}>
                        {/* <Grid item>
                          <Typography variant="subtitle1" noWrap>{movie.title}</Typography>
                        </Grid > */}
                        <Grid item>
                          {movie.seen ? (
                            <Button onClick={() => unseen(token, movie.imdbId)}>
                              <Typography variant="button" noWrap>mark as unseen</Typography>
                            </Button>
                          ) : (
                            <Button onClick={() => seen(token, movie.imdbId)}>
                              <Typography variant="button" noWrap>mark as seen</Typography>
                            </Button>
                          )}
                        </Grid >
                        <Grid item>
                          <Button component={Link} to={`/movie/${movie.imdbId}`}>
                            <Typography variant="button" noWrap>
                              watch now
                            </Typography>
                          </Button>
                        </Grid >
                        <Grid item>
                          <Button onClick={() => deleteWatchList(token, movie.imdbId)}>
                            <Typography variant="button" noWrap>
                              Remove from list
                            </Typography>
                          </Button>
                        </Grid >
                      </Grid>
                    </Grid>
                  </Paper>
                ))
              ) : (
                null
              )
            }
          </Grid>
      </Paper>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getWatchList: token => dispatch(getWatchListA(token)),
  deleteWatchList: (token, idMovie) => dispatch(deleteWatchListA(token, idMovie)),
  seen: (token, idMovie) => dispatch(seenA(token, idMovie)),
  unseen: (token, idMovie) => dispatch(unseenA(token, idMovie)),

});

const mapStateToProps = state => ({
  token: state.user.token,
  watchList: state.watchList.data,
});

WatchList.propTypes = {
  seen: PropTypes.func.isRequired,
  unseen: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  getWatchList: PropTypes.func.isRequired,
  deleteWatchList: PropTypes.func.isRequired,
  watchList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

WatchList.url = '/watchlist';
export default connect(mapStateToProps, mapDispatchToProps)(WatchList);
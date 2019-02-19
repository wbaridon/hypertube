import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Button,
  Typography,
  Paper,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  movieSeenA,
  movieUnseenA,
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

  handleSeen(token, idMovie, n, bool) {
    let { watchList } = this.props;
    const { movieSeen, movieUnseen } = this.props;
    watchList[n].seen = bool;
    this.setState({ watchList });
    bool ? movieSeen(token, idMovie) : movieUnseen(token, idMovie) ;
  } 

  render() {
    const {
      token,
      watchList,
      deleteWatchList,
    } = this.props;
    console.log(watchList);
    return (
      <Paper>
        <Grid style={{ margin: '15px' }}>
          <Typography variant="h5">
            Watchlist
          </Typography>
          <br />
          <Typography variant="subtitle1">
            Quels films dois tu regarder ?
          </Typography>
        </Grid>
        <Grid container direction="column" style={{ flexFlow: 'column' }}>
          {
            watchList.length !== 0 ? (
              watchList.map(movie => (
                <Paper key={movie.imdbId} style={{ margin: '15px' }}>
                  <Grid item container direction="row" style={{ flexFlow: 'row' }}>
                    <img
                      alt="moviepic"
                      style={{
                        maxHeight: '140px',
                        width: 'auto',
                        height: 'auto',
                        marginRight: '15px',
                      }}
                      src={movie.cover}
                    />
                    <Grid item container direction="row" alignItems="center" justify="space-evenly" key={movie.imdbId}>
                      {/* <Grid item>
                        <Typography variant="subtitle1" noWrap>{movie.title}</Typography>
                      </Grid > */}
                      <Grid item>
                        {movie.seen ? (
                          <Button onClick={() => this.handleSeen(token, movie.imdbId, watchList.indexOf(movie), false)}>
                            <Typography variant="button" noWrap>mark as unseen</Typography>
                          </Button>
                        ) : (
                          <Button onClick={() => this.handleSeen(token, movie.imdbId, watchList.indexOf(movie), true)}>
                            <Typography variant="button" noWrap>mark as seen</Typography>
                          </Button>
                        )}
                      </Grid>
                      <Grid item>
                        <Button component={Link} to={`/movie/${movie.imdbId}`}>
                          <Typography variant="button" noWrap>
                            watch now
                          </Typography>
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button onClick={() => deleteWatchList(token, movie.imdbId)}>
                          <Typography variant="button" noWrap>
                            Remove from list
                          </Typography>
                        </Button>
                      </Grid>
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
  movieSeen: (token, idMovie) => dispatch(movieSeenA(token, idMovie)),
  movieUnseen: (token, idMovie) => dispatch(movieUnseenA(token, idMovie)),

});

const mapStateToProps = state => ({
  token: state.user.token,
  watchList: state.watchList.data,
  test: state.watchList.dataa,
});

WatchList.propTypes = {
  movieSeen: PropTypes.func.isRequired,
  movieUnseen: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  getWatchList: PropTypes.func.isRequired,
  deleteWatchList: PropTypes.func.isRequired,
  watchList: PropTypes.arrayOf(PropTypes.shape({})),
};

WatchList.defaultProps = {
  watchList: [],
};

WatchList.url = '/watchlist';
export default connect(mapStateToProps, mapDispatchToProps)(WatchList);
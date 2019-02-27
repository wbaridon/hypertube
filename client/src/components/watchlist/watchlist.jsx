import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Button,
  Typography,
  Paper,
} from '@material-ui/core';
import {
  FormattedMessage,
  injectIntl,
} from 'react-intl';
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
    const { watchList } = this.props;
    const { movieSeen, movieUnseen } = this.props;
    watchList[n].seen = bool;
    // this.setState({ watchList });
    this.forceUpdate();
    if (bool) {
      movieSeen(token, idMovie);
    } else {
      movieUnseen(token, idMovie);
    }
  }

  render() {
    const {
      token,
      watchList,
      deleteWatchList,
    } = this.props;
    return (
      <Paper>
        <Grid style={{ padding: '15px' }}>
          <Typography variant="h5">
            <FormattedMessage id="watchList.title" />
          </Typography>
          <br />
          <Typography variant="subtitle1">
            <FormattedMessage id="watchList.subtitle" />
          </Typography>
        </Grid>
        <Grid container direction="column" style={{ flexFlow: 'column' }}>
          {
            watchList.length !== 0 ? (
              watchList.map(movie => (
                <Paper key={movie.imdbId} style={{ margin: '10px', borderRadius: '6px' }}>
                  <Grid item container direction="row" style={{ flexFlow: 'row' }}>
                    <Link to={`/movie/${movie.imdbId}`} style={{ paddingRight: '15px' }}>
                      <img
                        alt="moviepic"
                        style={{
                          maxHeight: '140px',
                          width: 'auto',
                          height: 'auto',
                          borderRadius: '6px',
                        }}
                        src={movie.cover}
                      />
                    </Link>
                    <Grid item container direction="column" justify="space-evenly">
                      <Typography variant="h6" component={Link} to={`/movie/${movie.imdbId}`} style={{ marginLeft: '14px', textDecoration: 'none' }}>
                        {movie.title}
                      </Typography>
                      <Grid item container direction="row" alignItems="center" justify="space-evenly" key={movie.imdbId}>
                        <Grid item>
                          {movie.seen ? (
                            <Button variant="contained" color="primary" onClick={() => this.handleSeen(token, movie.imdbId, watchList.indexOf(movie), false)}>
                              <Typography variant="button" style={{ color: 'white' }} noWrap><FormattedMessage id="watchList.markunseen" /></Typography>
                            </Button>
                          ) : (
                            <Button variant="contained" color="primary" onClick={() => this.handleSeen(token, movie.imdbId, watchList.indexOf(movie), true)}>
                              <Typography variant="button" style={{ color: 'white' }} noWrap><FormattedMessage id="watchList.markseen" /></Typography>
                            </Button>
                          )}
                        </Grid>
                        <Grid item>
                          <Button variant="contained" color="primary" onClick={() => deleteWatchList(token, movie.imdbId)}>
                            <Typography variant="button" style={{ color: 'white' }} noWrap>
                              <FormattedMessage id="watchList.remove" />
                            </Typography>
                          </Button>
                        </Grid>
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
export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(WatchList));

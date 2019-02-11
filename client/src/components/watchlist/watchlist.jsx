import React from 'react';
import PropTypes from 'prop-types';
import {
  TableCell,
  Button,
  Typography,
  TableRow,
  Table,
  TableBody,
  Paper,
  Avatar,
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
      <Paper style={{width:'100%', overflowX: 'auto'}}>
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
                watchList.map(movie => (
                  <TableRow key={movie.imdbId}>
                    <TableCell>
                      <Avatar alt="moviepic" src={movie.cover} />
                    </TableCell>
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
                      <Button component={Link} to={`/movie/${movie.imdbId}`}>
                        <Typography variant="button" noWrap>
                          watch now
                        </Typography>
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => deleteWatchList(token, movie.imdbId)}>
                        <Typography variant="button" noWrap>
                          Remove from list
                        </Typography>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
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
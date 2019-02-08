import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid, Paper } from '@material-ui/core';

function DumbWatchlist({
  watchList,
}) {
  if (watchList.length === 0) {
    return (<div>no watchlist movie yet</div>)
  }
  return (
    watchList.map((movie) => {
      return (
        <Paper>
          <Typography>
            {movie.id}
          </Typography>
        </Paper>
      );
    })
  );
}

DumbWatchlist.propTypes = {
  watchList: PropTypes.shape({}).isRequired,
};

export default DumbWatchlist;
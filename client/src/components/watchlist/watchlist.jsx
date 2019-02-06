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
import DumbWatchlist from './dumb';

class Watchlist extends React.Component {
  
  render() {
    
    return (
      <Grid>
        <DumbWatchlist />
      </Grid>
    );
  }
}

Watchlist.url = '/watchlist';
export default Watchlist;
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ButtonBase, Grid, Button,
} from '@material-ui/core';
import { Link } from 'react-router-dom';


class MovieCard extends Component {
  componentWillMount() {

  }

  render() {
    const {
      imdbId,
      title,
      year,
      cover,
      synopsis,
    } = this.props;
    return (
      <Grid container>
        <Grid item>
          <Link to={`/movie/${imdbId}`}>
            <img style={{ height: 360, width: 240 }} src={cover} alt={title} />
          </Link>
        </Grid>
      </Grid>
    );
  }
}

MovieCard.propTypes = {
  imdbId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  cover: PropTypes.string.isRequired,
  synopsis: PropTypes.string.isRequired,
};

export default MovieCard;

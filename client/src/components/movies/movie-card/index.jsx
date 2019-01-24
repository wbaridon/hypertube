import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
} from '@material-ui/core';

const styles = {
  media: {
    height: 100,
  },
};

function MovieCard({
  imdbId,
  title,
  year,
  cover,
  synopsis,
  myPropClass,
  dimensions,
  classes,
}) {
  return (
    <img src={cover} style={{ maxWidth: dimensions.width, height: 'auto' }} alt={title} />
  );
}


MovieCard.propTypes = {
  imdbId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  cover: PropTypes.string.isRequired,
  synopsis: PropTypes.string.isRequired,
  myPropClass: PropTypes.string.isRequired,
  dimensions: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(MovieCard);

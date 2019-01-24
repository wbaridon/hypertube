import React from 'react';
import PropTypes from 'prop-types';

function MovieCard({
  title,
  cover,
  dimensions,
}) {
  return (
    <img src={cover} style={{ maxWidth: dimensions.width, height: 'auto' }} alt={title} />
  );
}


MovieCard.propTypes = {
  title: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
  dimensions: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
};

export default MovieCard;

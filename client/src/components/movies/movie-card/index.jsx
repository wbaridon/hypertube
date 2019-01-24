import React from 'react';
import PropTypes from 'prop-types';

function MovieCard({
  title,
  cover,
  dimensions,
}) {
  return (
    <img src={cover} style={{ maxWidth: dimensions.width, height: 'auto', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.3)' }} alt={title} />
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

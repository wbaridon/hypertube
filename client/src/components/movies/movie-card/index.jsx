import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '@material-ui/core';


class MovieCard extends React.Component {
  constructor() {
    super();
    this.state = {
      image: true,
    };
    this.setImageFalse = this.setImageFalse.bind(this);
  }

  setImageFalse() {
    this.setState({ image: false });
  }

  render() {
    const {
      seen,
      title,
      cover,
      dimensions,
    } = this.props;
    const { image } = this.state;
    return (
      <Card style={{ width: dimensions.width, height: dimensions.height }}>
        {image ? (
          <img
            onError={this.setImageFalse}
            src={cover}
            style={{
              opacity: seen ? 0.3 : 1,
              width: dimensions.width,
              height: 'auto',
              boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.3)',
            }}
            alt={title}
          />
        ) : null
        }
      </Card>
    );
  }
}

MovieCard.propTypes = {
  seen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
  dimensions: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
};

export default MovieCard;

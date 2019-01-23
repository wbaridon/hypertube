import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ButtonBase,
  Grid,
  Button,
  Tooltip,
  Popper,
  Popover,
  Typography,
  Paper,
  withStyles,
  Card,
  CardMedia,
  CardContent,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const styles = {
  media: {
    height: 100,
  },
};

class MovieCard extends Component {
  constructor() {
    super();

    this.state = {
      hovered: false,
      height: 0,
    };

  }

  componentDidMount() {

  }

  render() {
    const {
      imdbId,
      title,
      year,
      cover,
      synopsis,
      myPropClass,
      classes,
    } = this.props;
    return (
      <Link to={`/movie/${imdbId}`}>
        <img src={cover} className={myPropClass} alt={title} />
      </Link>
    );
  }
}

MovieCard.propTypes = {
  imdbId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  cover: PropTypes.string.isRequired,
  synopsis: PropTypes.string.isRequired,
  myPropClass: PropTypes.string.isRequired,
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(MovieCard);

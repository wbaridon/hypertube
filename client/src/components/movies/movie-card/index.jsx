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
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const styles = {
  popper: {
    maxWidth: 360,
  },
};

class MovieCard extends Component {
  constructor() {
    super();
    this.state = {
      tooltip: false,
      anchorEl: null,
    };

    this.removeToolTip = this.removeToolTip.bind(this);
    this.putToolTip = this.putToolTip.bind(this);
  }

  componentWillMount() {

  }

  putToolTip(event) {
    this.setState({ tooltip: true, anchorEl: event.currentTarget });
    console.log('test');
  }

  removeToolTip() {
    console.log('test');
    this.setState({ tooltip: false, anchorEl: null });
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
    const {
      tooltip,
      anchorEl,
    } = this.state;
    return (
      <Grid container>
        <Grid item onMouseOut={this.removeToolTip} onBlur={this.removeToolTip} onMouseOver={this.putToolTip} onFocus={this.putToolTip}>
          <Link to={`/movie/${imdbId}`}>
            <img src={cover} className={myPropClass} alt={title} />
          </Link>
          <Popper className={myPropClass} onMouseOut={this.removeToolTip} onBlur={this.removeToolTip} open={tooltip} anchorEl={anchorEl}>
            <Paper>
              <Typography>
                {synopsis}
              </Typography>
            </Paper>
          </Popper>
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
  myPropClass: PropTypes.string.isRequired,
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(MovieCard);

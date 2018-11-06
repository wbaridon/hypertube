import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

const myStyles = {
  root: {
    width: '52px',
  },
};

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid container spacing={0} alignItems="center" justify="center">
        <Grid item>
          <Link to="/register" className={classes.root}>REGISTER</Link>
        </Grid>
      </Grid>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

Home.url = '/';
export default withStyles(myStyles)(Home);

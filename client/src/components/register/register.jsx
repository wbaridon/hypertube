import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid, Button,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import RegisterCard from './register-card';

const styles = {};


class Register extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <Grid container direction="row" justify="space-around" wrap="nowrap">
        <Grid item>
          <Button component={Link} to="/login">
            LOGIN
          </Button>
          <RegisterCard />
        </Grid>
      </Grid>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired,
};

Register.url = '/register';
export default withStyles(styles)(Register);

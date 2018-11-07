import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';
import RegisterCard from './register-card';

const styles = {};

class Register extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { } = this.props;
    const { } = this.state;
    return (
      <Grid container direction="row" justify="space-around" wrap="nowrap">
        <Grid item>
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

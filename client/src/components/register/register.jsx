import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid, Button,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import RegisterCard from './register-card';
import { setLocale } from '../../actions/index';

const styles = {};

const mapDispatchToProps = (dispatch) => {
  return ({
    changeLocale: () => dispatch(setLocale('fr')),
  });
};

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    const { changeLocale } = this.props;
    return (
      <Grid container direction="row" justify="space-around" wrap="nowrap">
        <Grid item>
          <Button onClick={changeLocale}>
            Toggle locale
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
  changeLocale: PropTypes.func.isRequired,
};

Register.url = '/register';
export default connect(null, mapDispatchToProps)(withStyles(styles)(Register));

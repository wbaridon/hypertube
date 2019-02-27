import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import RegisterCard from './register-card';
import './autocomplete-fix.css';


function Register() {
  return (
    <Grid container direction="column" justify="center" alignItems="center" alignContent="center" wrap="nowrap">
      <Grid item>
        <RegisterCard />
      </Grid>
    </Grid>
  );
}

Register.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
    hash: PropTypes.string.isRequired,
  }).isRequired,
};

Register.url = '/register';
export default withRouter((Register));

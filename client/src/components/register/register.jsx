import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import * as qs from 'query-string';
import RegisterCard from './register-card';

const styles = {};

function getProvider(url) {
  const parts = url.split('/');
  const provider = parts.pop() || parts.pop(); // handle potential trailing slash

  return (provider);
}

class Register extends React.Component {
  constructor(props) {
    super(props);
    const { code } = qs.parse(props.location.search, { ignoreQueryPrefix: true });
    this.state = {
      provider: getProvider(props.location.pathname),
      code,
    };
  }

  render() {
    const { provider, code } = this.state;
    return (
      <Grid container direction="row" justify="space-around" wrap="nowrap">
        <Grid item>
          <RegisterCard provider={provider} code={code} />
        </Grid>
      </Grid>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
  }).isRequired,
};

Register.url = '/register';
export default withRouter(withStyles(styles)(Register));

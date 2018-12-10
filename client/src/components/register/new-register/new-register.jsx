import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as qs from 'query-string';
import { registerUserOauth } from 'Actions/register-user-oauth';
import OauthRegister from './oauth-register';
import RegisterCard from '../register-card';
import './autocomplete-fix.css';

const styles = {};

function getProvider(url) {
  const parts = url.split('/');
  const provider = parts.pop() || parts.pop(); // handle potential trailing slash

  return (provider);
}

const mapStateToProps = state => ({
  registerDataExists: state.user.registerData.exists,
});

const mapDispatchToProps = dispatch => ({
  registerUserOauthHandler: (provider, code) => dispatch(registerUserOauth(provider, code)),
});

class Register extends React.Component {
  constructor(props) {
    super(props);
    const { code } = qs.parse(props.location.search, { ignoreQueryPrefix: true });
    const provider = getProvider(props.location.pathname);
    if (code !== '' && provider !== 'register') {
      props.registerUserOauthHandler(provider, code);
    }
    this.state = {
      provider,
    };
  }

  render() {
    const { registerDataExists } = this.props;
    const { provider } = this.state;
    return (
      <Grid container direction="row" justify="space-around" wrap="nowrap">
        <Grid item>
          {registerDataExists
            ? (<OauthRegister provider={provider} />)
            : (<RegisterCard />)}
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
  registerDataExists: PropTypes.bool.isRequired,
  registerUserOauthHandler: PropTypes.func.isRequired,
};

Register.url = '/register';
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(Register)));

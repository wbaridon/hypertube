import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as qs from 'query-string';
import { oAuthUserA } from 'Actions';
import LoadingDots from '../loading-dots';

function getProvider(url) {
  const parts = url.split('/');
  const provider = parts.pop() || parts.pop(); // handle potential trailing slash

  return (provider);
}

class Oauth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      provider: getProvider(props.location.pathname),
      code: qs.parse(props.location.search, { ignoreQueryPrefix: true }).code || null,
    };
  }

  componentWillMount() {
    const { provider, code } = this.state;
    const { handleoAuthUser, location } = this.props;
    let googleCode;

    if (provider) {
      if (provider === 'google') {
        googleCode = qs.parse(location.hash, { ignoreQueryPrefix: true }).access_token;
      }
      handleoAuthUser(provider, code || googleCode);
    }
  }


  render() {
    const { success, errored } = this.props;
    if (success || errored) {
      return (<Redirect to="/" />);
    }
    return (<LoadingDots />);
  }
}

Oauth.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
  }).isRequired,
  handleoAuthUser: PropTypes.func.isRequired,
  success: PropTypes.bool.isRequired,
  errored: PropTypes.bool.isRequired,
};

Oauth.url = '/oauth';

const mapStateToProps = state => ({
  success: state.loginUser.success,
  errored: state.loginUser.errored,
});

const mapDispatchToProps = dispatch => ({
  handleoAuthUser: (provider, code) => dispatch(oAuthUserA(provider, code)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Oauth));

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as qs from 'query-string';
import { oAuthUserA, oAuthUserGoogleA } from 'Actions';

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
    return (<div>test</div>);
  }
}

Oauth.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
  }).isRequired,
  handleoAuthUser: PropTypes.func.isRequired,
};

Oauth.url = '/oauth';

const mapDispatchToProps = dispatch => ({
  handleoAuthUser: (provider, code) => dispatch(oAuthUserA(provider, code)),
});

export default connect(null, mapDispatchToProps)(withRouter(Oauth));

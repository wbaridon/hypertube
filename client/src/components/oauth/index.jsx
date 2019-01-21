import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as qs from 'query-string';
import { oAuthUserA } from '../../redux/actions/oauth-user';

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
      code: qs.parse(props.location.search, { ignoreQueryPrefix: true }).code || '',
    };
  }

  componentWillMount() {
    const { provider, code } = this.state;
    const { handleoAuthUser } = this.props;
    if (provider && code) {
      console.log(provider, code);
      handleoAuthUser(provider, code);
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

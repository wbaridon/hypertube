import React, { Component } from 'react'
import PropTypes from 'prop-types';

class Settings extends Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        {user.email}
      </div>
    )
  }
}


Settings.url = '/settings';
Settings.propTypes = {
  user: PropTypes.shape({}).isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(Settings);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, TextField } from '@material-ui/core';
import { updateUser } from 'Actions/';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props.user,
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  handleFieldChange(field, value) {
    this.setState({ [field]: value });
  }

  render() {
    const { handleUpdateUser, token } = this.props;
    const { email, firstName, lastName } = this.state;
    return (
      <div>
        <TextField
          value={email}
          label="email"
          onChange={e => this.handleFieldChange('email', e.target.value)}
        />
        <br />
        <TextField
          value={firstName}
          label="firstName"
          onChange={e => this.handleFieldChange('firstName', e.target.value)}
        />
        <br />
        <TextField
          value={lastName}
          label="lastName"
          onChange={e => this.handleFieldChange('lastName', e.target.value)}
        />
        <br />
        <Button onClick={() => handleUpdateUser(token, { email, firstName, lastName })}>
          UpdateUser
        </Button>
      </div>
    );
  }
}


Settings.url = '/settings';
Settings.propTypes = {
  user: PropTypes.shape({
  }).isRequired,
  handleUpdateUser: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  token: state.user.token,
  user: state.user.data,
});

const mapDispatchToProps = dispatch => ({
  handleUpdateUser: (token, changes) => dispatch(updateUser(token, changes)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

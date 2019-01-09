import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, TextField } from '@material-ui/core';
import { updateUser } from 'Actions/';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user,
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  handleFieldChange(field, value) {
    const { user } = this.state;
    this.setState({ user: { ...user, [field]: value } });
  }

  render() {
    const { handleUpdateUser, token } = this.props;
    const { user } = this.state;
    return (
      <div>
        {Object.keys(user)
          .map(key => (
            <React.Fragment key={key}>
              <TextField
                fullWidth
                value={user[key]}
                label={key}
                onChange={e => this.handleFieldChange(key, e.target.value)}
              />
              <br />
            </React.Fragment>))}
        <Button onClick={() => handleUpdateUser(token, { ...user })}>
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

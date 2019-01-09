import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TextField } from '@material-ui/core';
import { updateUserField } from 'Actions/';
import debounce from 'lodash.debounce';
import ImageChanger from '../image-changer';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user,
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.debounced = debounce((field, value, token) => props.updateFieldHandle(field, value, token), 1500);
  }

  handleFieldChange(field, value) {
    const { user } = this.state;
    const { token } = this.props;
    this.setState({ user: { ...user, [field]: value } });
    this.debounced(field, value, token);
  }

  render() {
    const { user } = this.state;
    return (
      <div>
        <ImageChanger imageUrl={user.picture} />
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
      </div>
    );
  }
}


Settings.url = '/settings';
Settings.propTypes = {
  user: PropTypes.shape({
  }).isRequired,
  updateFieldHandle: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  token: state.user.token ? state.user.token : '',
  user: state.user.data,
});

const mapDispatchToProps = dispatch => ({
  updateFieldHandle: (field, value, token) => dispatch(updateUserField(token, field, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

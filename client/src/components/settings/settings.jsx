import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  updateUserFieldA,
  updateUserImageA,
} from 'Actions/';
import debounce from 'lodash.debounce';
import ImageChanger from '../image-changer';
import { dataURItoBlob } from '../image-changer/image-handle-functions';
import DumbSettings from './dumb';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      picture: props.user.picture,
      user: {
        userName: props.user.userName,
        email: props.user.email,
        firstName: props.user.firstName,
        lastName: props.user.lastName,
        locale: props.user.locale,
        darkTheme: props.user.darkTheme,
      },
      anchorEl: null,
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
    this.handleMenuOpen = this.handleMenuOpen.bind(this);
    this.debounced = debounce((token, field, value) => props.updateFieldHandle(token, field, value), 1500);
  }

  handleFieldChange(field, value) {
    console.log(this.state, field, value);
    const { token } = this.props;
    const { user } = this.state;
    user[field] = value;
    this.setState({ user });
    this.debounced(token, field, value);
  }

  handleMenuClose(locale = null) {
    const { user } = this.state;
    if (locale) {
      user.locale = locale;
    }
    this.setState({ user, anchorEl: null });
  }

  handleMenuOpen(e) {
    this.setState({ anchorEl: e.currentTarget });
  }

  handleImageChange(image) {
    const { picture } = this.state;
    const { updateImageHandle, token } = this.props;
    const form = new FormData();
    const img = dataURItoBlob(image.rawData);
    form.append('image', img);
    form.append('oldImageUrl', picture);
    updateImageHandle(token, form);
  }

  render() {
    const { picture, user, anchorEl } = this.state;
    console.log(user.darkTheme);
    return (
      <div>
        <ImageChanger imageUrl={picture} handleImageChange={this.handleImageChange} />
        <DumbSettings {...user} handleFieldChange={this.handleFieldChange} handleMenuClose={this.handleMenuClose} handleMenuOpen={this.handleMenuOpen} anchorEl={anchorEl} />
      </div>
    );
  }
}


Settings.url = '/settings';
Settings.propTypes = {
  user: PropTypes.shape({
  }).isRequired,
  updateFieldHandle: PropTypes.func.isRequired,
  updateImageHandle: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  token: state.user.token ? state.user.token : '',
  user: state.user.data,
});

const mapDispatchToProps = dispatch => ({
  updateFieldHandle: (token, field, value) => dispatch(updateUserFieldA(token, field, value)),
  updateImageHandle: (token, form) => dispatch(updateUserImageA(token, form)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

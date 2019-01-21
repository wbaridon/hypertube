import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  updateUserFieldA,
  updateUserImageA,
} from 'Actions/';
import { Grid, withStyles } from '@material-ui/core';
import debounce from 'lodash.debounce';
import ImageChanger from '../image-changer';
import { dataURItoBlob } from '../image-changer/image-handle-functions';
import DumbSettings from './dumb';
import ChangePassword from '../change-password';

const styles = {
  content: {
    minWidth: '305px',
  },
};

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
        oauth: props.user.oauth,
      },
      anchorEl: null,
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
    this.handleMenuOpen = this.handleMenuOpen.bind(this);
    this.debounced = {
      userName: debounce((token, field, value) => props.updateFieldHandle(token, field, value), 1500),
      email: debounce((token, field, value) => props.updateFieldHandle(token, field, value), 1500),
      firstName: debounce((token, field, value) => props.updateFieldHandle(token, field, value), 1500),
      lastName: debounce((token, field, value) => props.updateFieldHandle(token, field, value), 1500),
      locale: (token, field, value) => props.updateFieldHandle(token, field, value),
      darkTheme: (token, field, value) => props.updateFieldHandle(token, field, value),
    };
  }

  handleFieldChange(field, value) {
    console.log(this.state, field, value);
    const { token } = this.props;
    const { user } = this.state;
    user[field] = value;
    this.setState({ user });
    this.debounced[field](token, field, value);
  }

  handleMenuClose(locale = null) {
    if (locale) {
      this.handleFieldChange('locale', locale);
    }
    this.setState({ anchorEl: null });
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
    const { classes } = this.props;
    return (
      <Grid container spacing={0} direction="column" alignItems="center" justify="center" alignContent="center">
        <Grid item className={classes.content}>
          <ImageChanger imageUrl={user.oauth ? picture : `http:localhost:3000/images/${picture}`} handleImageChange={this.handleImageChange} />
        </Grid>
        <Grid item className={classes.content}>
          <DumbSettings {...user} handleFieldChange={this.handleFieldChange} handleMenuClose={this.handleMenuClose} handleMenuOpen={this.handleMenuOpen} anchorEl={anchorEl} />
        </Grid>
        {
          !user.oauth
            ? (
              <Grid item className={classes.content}>
                <ChangePassword />
              </Grid>
            ) : null
        }
      </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)((Settings)));

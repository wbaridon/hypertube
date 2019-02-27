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
import { clearUserFieldErrorA } from '../../redux/actions/update-user-field';

const styles = theme => ({
  content: {
    minWidth: '640px',
    maxWidth: '640px',
    [theme.breakpoints.only('xs')]: {
      minWidth: '320px',
      maxWidth: '320px',
    },
  },
  container: {
    width: '100%',
    margin: 0,
  },
});

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      picture: props.picture,
      userName: props.userName,
      email: props.email,
      firstName: props.firstName,
      lastName: props.lastName,
      locale: props.locale,
      oauth: props.oauth,
      darkTheme: props.darkTheme,
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
      image: debounce((token, form) => props.updateImageHandle(token, form), 1000),
    };
  }

  componentDidUpdate(prevProps) {
    const { field } = this.props;
    if (field !== prevProps.field) {
      const { clearUserFieldErrorHandle } = this.props;
      this.timeoutClearError = setTimeout(() => clearUserFieldErrorHandle(), 2500);
    }
  }

  componentWillUnmount() {

  }


  static getDerivedStateFromProps(props, state) {
    const {
      field,
      value,
    } = props;
    if (field && value && state[field] !== value) {
      return ({
        [field]: value,
      });
    }
    return null;
  }

  handleFieldChange(field, value) {
    const { token } = this.props;
    this.setState({ [field]: value });
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
    const { token } = this.props;
    const form = new FormData();
    const img = dataURItoBlob(image.rawData);
    form.append('image', img);
    form.append('oldImageUrl', picture);
    this.setState({ picture: image });
    this.debounced.image(token, form);
  }

  render() {
    const {
      picture,
      anchorEl,
      userName,
      firstName,
      lastName,
      email,
    } = this.state;
    const {
      locale,
      darkTheme,
      classes,
      field,
      value,
      oauth,
      errorMessage,
    } = this.props;
    const dbValues = {
      userName,
      firstName,
      lastName,
      email,
    };
    return (
      <Grid container className={classes.container} spacing={40} direction="row" alignItems="center" justify="center" alignContent="center" wrap="wrap">
        <Grid item className={classes.content}>
          <ImageChanger imageUrl={picture && picture.rawData ? picture.rawData : picture} handleImageChange={this.handleImageChange} />
        </Grid>
        <Grid item className={classes.content}>
          <DumbSettings
            userName={userName}
            firstName={firstName}
            lastName={lastName}
            email={email}
            darkTheme={darkTheme}
            locale={locale}
            erroredField={field ? { errorMessage, field, value } : null}
            dbValues={dbValues}
            handleFieldChange={this.handleFieldChange}
            handleMenuClose={this.handleMenuClose}
            handleMenuOpen={this.handleMenuOpen}
            anchorEl={anchorEl}
          />
        </Grid>
        {
          !oauth
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
  classes: PropTypes.shape({}).isRequired,
  field: PropTypes.string,
  value: PropTypes.string,
  errorMessage: PropTypes.string,
  userName: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  darkTheme: PropTypes.bool.isRequired,
  locale: PropTypes.string.isRequired,
  oauth: PropTypes.bool,
  picture: PropTypes.string.isRequired,
  updateFieldHandle: PropTypes.func.isRequired,
  updateImageHandle: PropTypes.func.isRequired,
  clearUserFieldErrorHandle: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

Settings.defaultProps = {
  field: null,
  value: null,
  errorMessage: null,
  oauth: false,
};

const mapStateToProps = state => ({
  userName: state.user.data.userName,
  firstName: state.user.data.firstName,
  lastName: state.user.data.lastName,
  email: state.user.data.email,
  darkTheme: state.user.data.darkTheme,
  locale: state.user.data.locale,
  oauth: state.user.data.oauth,
  picture: state.user.data.picture,
  token: state.user.token ? state.user.token : '',
  field: state.updateUser.field,
  value: state.updateUser.value,
  errorMessage: state.updateUser.errorMessage,
});

const mapDispatchToProps = dispatch => ({
  updateFieldHandle: (token, field, value) => dispatch(updateUserFieldA(token, field, value)),
  updateImageHandle: (token, form) => dispatch(updateUserImageA(token, form)),
  clearUserFieldErrorHandle: () => dispatch(clearUserFieldErrorA()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)((Settings)));

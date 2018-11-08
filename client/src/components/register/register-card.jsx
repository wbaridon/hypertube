import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Button,
  ButtonBase,
  Typography,
  Switch,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import AddPhotoAlternate from '@material-ui/icons/AddPhotoAlternate';
import RotateRight from '@material-ui/icons/RotateRight';
import RotateLeft from '@material-ui/icons/RotateLeft';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import Flip from '@material-ui/icons/Flip';
import { intlShape, injectIntl } from 'react-intl';
import * as qs from 'query-string';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import handlers from './event-handlers';
import {
  rotateClockwise,
  rotateCounterClockwise,
  flip,
  handleImageAdd,
  offsetY,
  dataURItoBlob,
} from './image-handle-functions';
import styles from './styles';

function handleDragOver(evt) {
  evt.stopPropagation();
  evt.preventDefault();
}

class RegisterCard extends React.Component {
  constructor() {
    super();
    this.state = {
      image: {
        rawData: null,
        inputFile: null,
        verticalOffset: 0,
        isLandscape: true,
        orientation: 1,
        error: '',
      },
      locale: 'en',
      userName: '',
      userNameError: [],
      firstName: '',
      firstNameError: [],
      lastName: '',
      lastNameError: [],
      email: '',
      emailError: [],
      password: '',
      passwordError: [],
      showPassword: false,
    };

    this.mergeErrors = this.mergeErrors.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.rotateCounterClockwise = rotateCounterClockwise.bind(this);
    this.rotateClockwise = rotateClockwise.bind(this);
    this.handleImageAdd = handleImageAdd.bind(this);
    this.flip = flip.bind(this);
    this.offsetY = offsetY.bind(this);
    this.handleImageAddWrapper = this.handleImageAddWrapper.bind(this);
    this.toggleLocale = this.toggleLocale.bind(this);
  }

  componentDidMount() {
    const dropZone = document.getElementById('root');
    dropZone.addEventListener('dragover', handleDragOver, false);
    dropZone.addEventListener('drop', event => this.handleImageAddWrapper(event), false);
    const { history } = this.props;
    if (history.location.search) {
      const { code } = qs.parse(history.location.search, { ignoreQueryPrefix: true });
      Axios({
        method: 'post',
        url: 'http://localhost:3000/oauth/register/42',
        data: {
          clientCode: code,
        },
      });
    }
  }

  handleImageAddWrapper(event) {
    this.handleImageAdd(event.dataTransfer.files[0], event);
  }

  mergeErrors(errors) {
    const { intl } = this.props;
    let ret = '';
    errors.forEach((error, index) => {
      if (index === 0) {
        ret = `${ret}${intl.formatMessage({ id: error })}`;
      } else {
        ret = `${intl.formatMessage({ id: error })} - ${ret}`;
      }
    });
    return ret;
  }

  handleChange(field, event) {
    const err = handlers[field](event.target.value);
    const fieldError = `${field}Error`;
    this.setState({ [field]: event.target.value, [fieldError]: err });
  }

  handleClickShowPassword() {
    const { showPassword } = this.state;
    this.setState({ showPassword: !showPassword });
  }

  toggleLocale() {
    let { locale } = this.state;

    if (locale === 'en') {
      locale = 'fr';
    } else {
      locale = 'en';
    }
    this.setState({ locale });
  }

  handleSubmit(e) {
    e.preventDefault();
    let willSend = true;
    const {
      userName, userNameError,
      firstName, firstNameError,
      lastName, lastNameError,
      email, emailError,
      password, passwordError,
      locale,
      image,
    } = this.state;

    if (userName === '' || userNameError.length !== 0) {
      willSend = false;
    } else if (email === '' || emailError.length !== 0) {
      willSend = false;
    } else if (firstName === '' || firstNameError.length !== 0) {
      willSend = false;
    } else if (lastName === '' || lastNameError.length !== 0) {
      willSend = false;
    } else if (password === '' || passwordError.length !== 0) {
      willSend = false;
    } else if (!image.rawData) {
      willSend = false;
    }
    const formData = {
      userName,
      firstName,
      lastName,
      email,
      password,
      locale,
    };
    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      console.log(key, formData[key]);
      form.append(key, formData[key]);
    });
    if (image.inputFile) {
      image.inputFile = dataURItoBlob(image.rawData);
    }
    form.append('image', image.inputFile);
    if (willSend) {
      Axios({
        method: 'post',
        url: 'http://localhost:3000/user/register',
        data: formData,
        config: { headers: { 'Content-Type': 'multipart/form-data' } },
      })
        .then((response) => {
          // handle success
          console.log(response);
        })
        .catch((response) => {
          // handle error
          console.log(response);
        });
    }
    console.log(form);
  }

  render() {
    const { classes, intl } = this.props;
    const {
      image,
      userName, userNameError,
      firstName, firstNameError,
      lastName, lastNameError,
      email, emailError,
      password, passwordError, showPassword,
      locale,
    } = this.state;
    return (
      <Card className={classes.card}>
        <CardMedia src="squelch" id="dragAndDrop">
          {
            image.rawData
              ? (
                <React.Fragment>
                  <ButtonBase
                    focusRipple
                    className={classes.image}
                    focusVisibleClassName={classes.focusVisible}
                    component="label"
                    style={{
                      width: '100%',
                    }}
                  >
                    <input onChange={e => this.handleImageAdd(e.target.files[0])} style={{ display: 'none' }} type="file" />
                    <span
                      className={classes.imageSrc}
                      style={{
                        backgroundImage: `url(${image.rawData})`,
                      }}
                    />
                    <span className={classes.imageBackdrop} />
                    <span className={classes.imageButton}>
                      <Typography
                        component="span"
                        variant="subtitle1"
                        color="error"
                        className={classes.imageTitle}
                      >
                        {intl.formatMessage({ id: 'register.profilePicture' })}
                      </Typography>
                    </span>
                  </ButtonBase>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <IconButton onClick={this.rotateCounterClockwise} aria-label="Rotate CCW">
                      <RotateLeft />
                    </IconButton>
                    {(image.isLandscape && image.orientation <= 4) || (!image.isLandscape && image.orientation > 4) ? null
                      : (
                        <IconButton onClick={() => this.offsetY(-10)} aria-label="offset down">
                          <ArrowDropDown />
                        </IconButton>
                      )
                    }
                    <IconButton onClick={this.flip} aria-label="Flip">
                      <Flip />
                    </IconButton>
                    {(image.isLandscape && image.orientation <= 4) || (!image.isLandscape && image.orientation > 4) ? null
                      : (
                        <IconButton onClick={() => this.offsetY(10)} aria-label="offset up">
                          <ArrowDropUp />
                        </IconButton>
                      )
                    }
                    <IconButton onClick={this.rotateClockwise} aria-label="Rotate CW">
                      <RotateRight />
                    </IconButton>
                  </div>
                </React.Fragment>
              )
              : (
                <Button component="label" label="add image" className={classes.photoButton}>
                  <input onChange={e => this.handleImageAdd(e.target.files[0])} style={{ display: 'none' }} type="file" />
                  <AddPhotoAlternate />
                  <Typography>{`${intl.formatMessage({ id: 'register.addImage' })}${image.error}`}</Typography>
                </Button>
              )
          }
        </CardMedia>
        <form action="" encType="multipart/form-data" onSubmit={e => this.handleSubmit(e)}>
          <CardContent>
            <TextField
              fullWidth
              error={userNameError.length !== 0}
              id="filled-simple-start-adornment"
              variant="filled"
              label={intl.formatMessage({ id: 'register.userName' })}
              type="text"
              value={userName}
              onChange={e => this.handleChange('userName', e)}
              helperText={userNameError.length ? this.mergeErrors(userNameError) : ' '}
            />
            <br />
            <TextField
              fullWidth
              error={emailError.length !== 0}
              variant="filled"
              label={intl.formatMessage({ id: 'register.email' })}
              type="email"
              value={email}
              onChange={e => this.handleChange('email', e)}
              helperText={emailError.length ? this.mergeErrors(emailError) : ' '}
            />
            <br />
            <TextField
              fullWidth
              error={firstNameError.length !== 0}
              variant="filled"
              label={intl.formatMessage({ id: 'register.firstName' })}
              value={firstName}
              onChange={e => this.handleChange('firstName', e)}
              helperText={firstNameError.length ? this.mergeErrors(firstNameError) : ' '}
            />
            <br />
            <TextField
              fullWidth
              error={lastNameError.length !== 0}
              variant="filled"
              label={intl.formatMessage({ id: 'register.lastName' })}
              value={lastName}
              onChange={e => this.handleChange('lastName', e)}
              helperText={lastNameError.length ? this.mergeErrors(lastNameError) : ' '}
            />
            <br />
            <TextField
              fullWidth
              error={passwordError.length !== 0}
              id="filled-adornment-password"
              variant="filled"
              type={showPassword ? 'text' : 'password'}
              label={intl.formatMessage({ id: 'register.password' })}
              value={password}
              onChange={e => this.handleChange('password', e)}
              InputProps={{
                endAdornment: (
                  <InputAdornment variant="filled" position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={this.handleClickShowPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              helperText={passwordError.length ? this.mergeErrors(passwordError) : ' '}
            />
            <Switch checked={locale === 'en'} onChange={this.toggleLocale} />
          </CardContent>
          <CardActions>
            <Button type="submit" variant="contained" onClick={this.handleSubmit}>{intl.formatMessage({ id: 'register.submit' })}</Button>
            <Button href="https://api.intra.42.fr/oauth/authorize?client_id=5c2c11c20bea09a8590b502f86b0c5cf6a64faada97ce1bc7f13dabd64a128cd&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fregister&response_type=code" variant="contained">
              {intl.formatMessage({ id: 'register.registerWith42' })}
            </Button>
          </CardActions>
        </form>
      </Card>
    );
  }
}

RegisterCard.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  intl: intlShape.isRequired,
  history: PropTypes.shape({}).isRequired,
};

export default withRouter(injectIntl(withStyles(styles)(RegisterCard)));

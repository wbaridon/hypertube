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
import { connect } from 'react-redux';
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
import { registerUser } from 'Actions/index';
import { intlShape, injectIntl } from 'react-intl';
import handlers, { handleSubmit, toggleLocale, handleClickShowPassword } from './event-handlers';
import {
  rotateClockwise,
  rotateCounterClockwise,
  flip,
  handleImageAdd,
  offsetY,
} from './image-handle-functions';
import styles from './styles';

function handleDragOver(evt) {
  evt.stopPropagation();
  evt.preventDefault();
}

const mapStateToProps = (state) => {
  return ({
    registerError: state.user.error,
  });
};

const mapDispatchToProps = (dispatch) => {
  return ({
    registerUserHandler: form => dispatch(registerUser(form)),
  });
};

class RegisterCard extends React.Component {
  constructor(props) {
    super(props);
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

    this.handleChange = this.handleChange.bind(this);
    this.handleClickShowPassword = handleClickShowPassword.bind(this);
    this.handleSubmit = handleSubmit.bind(this);
    this.rotateCounterClockwise = rotateCounterClockwise.bind(this);
    this.rotateClockwise = rotateClockwise.bind(this);
    this.handleImageAdd = handleImageAdd.bind(this);
    this.flip = flip.bind(this);
    this.offsetY = offsetY.bind(this);
    this.handleImageAddWrapper = this.handleImageAddWrapper.bind(this);
    this.toggleLocale = toggleLocale.bind(this);
    this.mergeErrors = this.mergeErrors.bind(this);
  }

  componentDidMount() {
    this.dropZone = document.getElementById('root');
    this.dropZone.addEventListener('dragover', handleDragOver, false);
    this.dropZone.addEventListener('drop', event => this.handleImageAddWrapper(event), false);
  }

  componentWillUnmount = () => {
    this.dropZone.removeEventListener('dragover', handleDragOver);
    this.dropZone.removeEventListener('drop', event => this.handleImageAddWrapper(event));
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

  handleImageAddWrapper(event) {
    this.handleImageAdd(event.dataTransfer.files[0], event);
  }

  render() {
    const { classes, intl, registerError } = this.props;
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
        <form action="" onSubmit={e => this.handleSubmit(e)}>
          <CardContent>
            <TextField
              className="registerInputs"
              inputProps={{ className: classes.fixAutoComplete }}
              fullWidth
              error={userNameError.length !== 0}
              id="filled-simple-start-adornment"
              variant="filled"
              label={intl.formatMessage({ id: 'register.userName' })}
              type="text"
              autoComplete="username"
              name="username"
              value={userName}
              onChange={e => this.handleChange('userName', e)}
              helperText={userNameError.length ? this.mergeErrors(userNameError) : ' '}
            />
            <br />
            <TextField
              className="registerInputs"
              inputProps={{ className: classes.fixAutoComplete }}
              fullWidth
              error={emailError.length !== 0}
              variant="filled"
              label={intl.formatMessage({ id: 'register.email' })}
              type="email"
              name="email"
              value={email}
              onChange={e => this.handleChange('email', e)}
              helperText={emailError.length ? this.mergeErrors(emailError) : ' '}
            />
            <br />
            <TextField
              className="registerInputs"
              inputProps={{ className: classes.fixAutoComplete }}
              fullWidth
              error={firstNameError.length !== 0}
              variant="filled"
              label={intl.formatMessage({ id: 'register.firstName' })}
              value={firstName}
              name="firstname"
              onChange={e => this.handleChange('firstName', e)}
              helperText={firstNameError.length ? this.mergeErrors(firstNameError) : ' '}
            />
            <br />
            <TextField
              className="registerInputs"
              inputProps={{ className: classes.fixAutoComplete }}
              fullWidth
              error={lastNameError.length !== 0}
              variant="filled"
              label={intl.formatMessage({ id: 'register.lastName' })}
              value={lastName}
              name="lastname"
              onChange={e => this.handleChange('lastName', e)}
              helperText={lastNameError.length ? this.mergeErrors(lastNameError) : ' '}
            />
            <br />
            <TextField
              className="registerInputs"
              autoComplete="current-password"
              fullWidth
              error={passwordError.length !== 0}
              id="filled-adornment-password"
              variant="filled"
              type={showPassword ? 'text' : 'password'}
              label={intl.formatMessage({ id: 'register.password' })}
              value={password}
              onChange={e => this.handleChange('password', e)}
              InputProps={{
                className: classes.fixAutoComplete,
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
            {registerError.error !== undefined ? <Typography>{registerError.error}</Typography> : null}
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
  registerUserHandler: PropTypes.func.isRequired, // eslint-disable-line
  registerError: PropTypes.shape({}).isRequired,
  provider: PropTypes.string,
  code: PropTypes.string,
};

RegisterCard.defaultProps = {
  provider: '',
  code: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(withStyles(styles)(RegisterCard)));

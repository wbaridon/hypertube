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
import styles from './styles';

class RegisterCardDumb extends React.Component {
  constructor(props) {
    super(props);

    this.mergeErrors = this.mergeErrors.bind(this);
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

  render() {
    const {
      classes, intl,
      image,
      userName, userNameError,
      firstName, firstNameError,
      lastName, lastNameError,
      email, emailError,
      password, passwordError, showPassword,
      locale,
      darkTheme,
      handleChange,
      handleClickShowPassword,
      handleSubmit,
      handleImageAdd,
      toggleLocale,
      toggleTheme,
      flip,
      rotateClockwise,
      rotateCounterClockwise,
      offsetY,
    } = this.props;
    return (
      <Card key={image && locale} className={classes.card}>
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
                    <input onChange={e => handleImageAdd(e.target.files[0])} style={{ display: 'none' }} type="file" />
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
                    <IconButton onClick={rotateCounterClockwise} aria-label="Rotate CCW">
                      <RotateLeft />
                    </IconButton>
                    {(image.isLandscape && image.orientation <= 4) || (!image.isLandscape && image.orientation > 4) ? null
                      : (
                        <IconButton onClick={() => offsetY(-10)} aria-label="offset down">
                          <ArrowDropDown />
                        </IconButton>
                      )
                    }
                    <IconButton onClick={flip} aria-label="Flip">
                      <Flip />
                    </IconButton>
                    {(image.isLandscape && image.orientation <= 4) || (!image.isLandscape && image.orientation > 4) ? null
                      : (
                        <IconButton onClick={() => offsetY(10)} aria-label="offset up">
                          <ArrowDropUp />
                        </IconButton>
                      )
                    }
                    <IconButton onClick={rotateClockwise} aria-label="Rotate CW">
                      <RotateRight />
                    </IconButton>
                  </div>
                </React.Fragment>
              )
              : (
                <Button component="label" label="add image" className={classes.photoButton}>
                  <input onChange={e => handleImageAdd(e.target.files[0])} style={{ display: 'none' }} type="file" />
                  <AddPhotoAlternate />
                  <Typography color={!image.error ? 'default' : 'error'}>{`${intl.formatMessage({ id: image.error ? image.error : 'register.addImage' })}`}</Typography>
                </Button>
              )
          }
        </CardMedia>
        <form name="register" action="" onSubmit={e => this.handleSubmit(e)}>
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
              onChange={e => handleChange('userName', e)}
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
              onChange={e => handleChange('email', e)}
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
              onChange={e => handleChange('firstName', e)}
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
              onChange={e => handleChange('lastName', e)}
              helperText={lastNameError.length ? this.mergeErrors(lastNameError) : ' '}
            />
            <br />
            <TextField
              className="registerInputs"
              autoComplete="current-password"
              fullWidth
              error={passwordError.length !== 0 && password.length !== 0}
              id="filled-adornment-password"
              variant="filled"
              type={showPassword ? 'text' : 'password'}
              label={intl.formatMessage({ id: 'register.password' })}
              value={password}
              onChange={e => handleChange('password', e)}
              InputProps={{
                className: classes.fixAutoComplete,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              helperText={passwordError.length && password.length !== 0 ? this.mergeErrors(passwordError) : ' '}
            />
            <Switch checked={locale === 'en'} onChange={toggleLocale} />
            <Typography>{locale}</Typography>
            <Switch checked={darkTheme} onChange={toggleTheme} />
            <Typography>{darkTheme ? 'dark' : 'light'}</Typography>
          </CardContent>
          <CardActions>
            <Button type="submit" variant="contained" onClick={handleSubmit}>{intl.formatMessage({ id: 'register.submit' })}</Button>
          </CardActions>
        </form>
      </Card>
    );
  }
}

RegisterCardDumb.propTypes = {
  image: PropTypes.shape({}).isRequired,
  locale: PropTypes.string.isRequired,
  darkTheme: PropTypes.bool.isRequired,
  userName: PropTypes.string.isRequired,
  userNameError: PropTypes.arrayOf(PropTypes.string).isRequired,
  firstName: PropTypes.string.isRequired,
  firstNameError: PropTypes.arrayOf(PropTypes.string).isRequired,
  lastName: PropTypes.string.isRequired,
  lastNameError: PropTypes.arrayOf(PropTypes.string).isRequired,
  email: PropTypes.string.isRequired,
  emailError: PropTypes.arrayOf(PropTypes.string).isRequired,
  password: PropTypes.string.isRequired,
  passwordError: PropTypes.arrayOf(PropTypes.string).isRequired,
  showPassword: PropTypes.bool.isRequired,
  classes: PropTypes.shape({}).isRequired,
  intl: intlShape.isRequired,
  handleImageAdd: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleClickShowPassword: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  toggleLocale: PropTypes.func.isRequired,
  toggleTheme: PropTypes.func.isRequired,
  flip: PropTypes.func.isRequired,
  rotateClockwise: PropTypes.func.isRequired,
  rotateCounterClockwise: PropTypes.func.isRequired,
  offsetY: PropTypes.func.isRequired,
};

export default injectIntl((withStyles(styles)(RegisterCardDumb)));

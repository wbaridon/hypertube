import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Button,
  Grid,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { intlShape, injectIntl } from 'react-intl';
import handlers from './event-handlers';

const styles = {

};

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      image: null,
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

    this.reader = new FileReader();
    this.handleImageAdd = this.handleImageAdd.bind(this);
    this.mergeErrors = this.mergeErrors.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  mergeErrors(errors) {
    const { intl } = this.props;
    let ret = '';
    errors.forEach((error, index) => {
      if (index === 0) {
        ret = `${ret}${intl.formatMessage({ id: error })}`;
      } else {
        ret = `${intl.formatMessage({ id: error })}, ${ret}`;
      }
    });
    return ret;
  }

  handleChange(field, event) {
    const err = handlers[field](event.target.value);
    const fieldError = `${field}Error`;
    this.setState({ [field]: event.target.value, [fieldError]: err });
  }

  handleImageAdd(image) {
    if (image.type.match(/image\/*/)) {
      this.reader.onload = (event) => {
        this.setState({ image: event.target.result });
      };
      this.reader.readAsDataURL(image);
    }
  }

  handleClickShowPassword() {
    const { showPassword } = this.state;
    this.setState({ showPassword: !showPassword });
  }

  handleSubmit() {
    let willSend = true;
    const {
      userName, userNameError,
      firstName, firstNameError,
      lastName, lastNameError,
      email, emailError,
      password, passwordError,
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
    }
    console.log(willSend);
    console.log({
      userName,
      email,
      firstName,
      lastName,
      password,
    });
    return ({
      userName,
      email,
      firstName,
      lastName,
      password,
    });
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
    } = this.state;
    return (
      <Grid container alignItems="center" justify="center">
        <Grid item>
          <Card className={classes.card}>
            <CardMedia src="squelch">
              {
                image ? <img src={image} alt="Alt text" width={256} />
                  : (
                    <Button component="label" label="add image">
                      <input onChange={e => this.handleImageAdd(e.target.files[0])} style={{ display: 'none' }} type="file" />
                    </Button>
                  )
              }
            </CardMedia>
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
            </CardContent>
            <CardActions>
              <Button variant="contained" onClick={this.handleSubmit}>{intl.formatMessage({ id: 'register.submit' })}</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  intl: intlShape.isRequired,
};

Register.url = '/register';
export default injectIntl(withStyles(styles)(Register));

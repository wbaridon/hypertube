import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  registerUser,
  registerUserOauth,
  setError,
  clearRegisterData,
} from 'Actions/index';
import Axios from 'axios';
import handlers, {
  handleSubmit,
  toggleLocale,
  toggleTheme,
  handleClickShowPassword,
} from './event-handlers';
import {
  rotateClockwise,
  rotateCounterClockwise,
  flip,
  handleImageAdd,
  offsetY,
} from './image-handle-functions';
import RegisterCardDumb from './register-card-dumb';

const mapStateToProps = (state) => {
  return ({
    registerData: state.user.registerData,
  });
};

const mapDispatchToProps = (dispatch) => {
  return ({
    registerUserHandler: form => dispatch(registerUser(form)),
    clearRegisterDataHandler: () => dispatch(clearRegisterData()),
    registerUserOauthHandler: (provider, code) => dispatch(registerUserOauth(provider, code)),
    setErrorHandler: error => dispatch(setError(error)),
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
      darkTheme: false,
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
      provided: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClickShowPassword = handleClickShowPassword.bind(this);
    this.handleSubmit = handleSubmit.bind(this);
    this.rotateCounterClockwise = rotateCounterClockwise.bind(this);
    this.rotateClockwise = rotateClockwise.bind(this);
    this.handleImageAdd = handleImageAdd.bind(this);
    this.handleImageAddWrapper = this.handleImageAddWrapper.bind(this);
    this.flip = flip.bind(this);
    this.offsetY = offsetY.bind(this);
    this.toggleLocale = toggleLocale.bind(this);
    this.toggleTheme = toggleTheme.bind(this);
  }

  componentDidMount() {
    const {
      provider,
      code,
      registerUserOauthHandler,
    } = this.props;
    console.log(provider, code);
    if (provider !== 'register' && code !== '') {
      registerUserOauthHandler(provider, code);
      this.setState({ provided: true });
    }
  }

  componentDidUpdate = async () => {
    const { registerData, clearRegisterDataHandler } = this.props;
    if (registerData.exists) {
      try {
        const img = await Axios({
          method: 'get',
          responseType: 'blob',
          url: registerData.imageUrl,
          timeout: TIMEOUT_API,
        });
        this.handleImageAdd(img.data);
        this.setState({
          userName: registerData.userName,
          firstName: registerData.firstName,
          lastName: registerData.lastName,
          email: registerData.email,
          password: '',
        });
        clearRegisterDataHandler();
      } catch (e) {
        console.log(e);
      }
    }
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
    const {
      image,
      userName, userNameError,
      firstName, firstNameError,
      lastName, lastNameError,
      email, emailError,
      password, passwordError, showPassword,
      locale,
      darkTheme,
      provided,
    } = this.state;
    return (
      <RegisterCardDumb
        image={image}
        userName={userName}
        userNameError={userNameError}
        firstName={firstName}
        firstNameError={firstNameError}
        lastName={lastName}
        lastNameError={lastNameError}
        email={email}
        emailError={emailError}
        password={password}
        passwordError={passwordError}
        locale={locale}
        darkTheme={darkTheme}
        showPassword={showPassword}
        provided={provided}
        handleChange={this.handleChange}
        handleClickShowPassword={this.handleClickShowPassword}
        handleSubmit={this.handleSubmit}
        toggleLocale={this.toggleLocale}
        toggleTheme={this.toggleTheme}
        handleImageAddWrapper={this.handleImageAddWrapper}
        handleImageAdd={this.handleImageAdd}
        flip={this.flip}
        rotateClockwise={this.rotateClockwise}
        rotateCounterClockwise={this.rotateCounterClockwise}
        offsetY={this.offsetY}
      />
    );
  }
}

RegisterCard.propTypes = {
  registerUserHandler: PropTypes.func.isRequired, // eslint-disable-line
  registerUserOauthHandler: PropTypes.func.isRequired,
  provider: PropTypes.string,
  code: PropTypes.string,
  setErrorHandler: PropTypes.func.isRequired, // eslint-disable-line
  registerData: PropTypes.shape({}).isRequired,
};

RegisterCard.defaultProps = {
  provider: '',
  code: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterCard);

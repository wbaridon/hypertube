import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  registerUser,
  registerUserOauth,
  setError,
  clearRegisterData,
  loginUser,
} from 'Actions';
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
    registerData: state.registerUser.registerData,
    loading: state.registerUser.loading,
    provided: state.registerUser.provided,
  });
};

const mapDispatchToProps = (dispatch) => {
  return ({
    registerUserHandler: form => dispatch(registerUser(form)),
    loginUserHandler: user => dispatch(loginUser(user)),
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
      registerDataCleared: false,
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
    if (provider !== 'register' && code !== '') {
      registerUserOauthHandler(provider, code);
    }
  }

  componentDidUpdate = async () => {
    const {
      registerData,
      clearRegisterDataHandler,
      provider,
      success,
    } = this.props;
    const { registerDataCleared } = this.state;
    if (success) {
      const { userName, password } = this.state;
      const { loginUserHandler } = this.props;
      loginUserHandler({ userName, password });
    }
    if (registerData.exists && !registerDataCleared) {
      try {
        this.setState({
          registerDataCleared: true,
        });
        const img = await Axios({
          method: 'get',
          responseType: 'blob',
          url: registerData.imageUrl,
          timeout: TIMEOUT_API,
        });
        this.handleImageAdd(img.data);
        let { firstName, lastName } = registerData;
        if (provider === 'github') {
          [firstName, lastName] = lastName.split(' ');
        }
        this.setState({
          userName: registerData.userName,
          firstName,
          lastName,
          email: registerData.email,
          password: '',
        }, () => clearRegisterDataHandler());
      } catch (e) {
        console.error(e);
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
    } = this.state;
    const { loading, provided } = this.props;
    if (loading) {
      return (<div>loading</div>);
    }
    return (<RegisterCardDumb
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
  loading: PropTypes.bool.isRequired,
  success: PropTypes.bool.isRequired,
  provided: PropTypes.bool.isRequired,
};

RegisterCard.defaultProps = {
  provider: '',
  code: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterCard);

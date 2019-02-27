import * as EmailValidator from 'email-validator';
import PasswordValidator from 'password-validator';
import { dataURItoBlob } from './image-handle-functions';

const schema = new PasswordValidator();
schema
  .is().min(8)
  .is().max(30)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits()
  .has()
  .not()
  .spaces();


const textError = (string) => {
  let error = false;
  for (let i = 0; i < string.length; i++) {
    const char = string.charCodeAt(i);
    if ((char < 48 || char >= 58) && (char < 65 || char >= 91) && (char < 97 || char >= 123)) {
      error = true;
    }
  }
  return (error);
};

const handlers = {
  userName: (username) => {
    const errors = [];
    if (textError(username)) {
      errors.push('register.error.notNumberOrLetter');
    }
    return (errors);
  },
  email: (email) => {
    const errors = [];
    if (!EmailValidator.validate(email) && email !== '') {
      errors.push('register.error.emailBadFormat');
    }
    return (errors);
  },
  firstName: (firstname) => {
    const errors = [];
    if (textError(firstname)) {
      errors.push('register.error.notNumberOrLetter');
    }
    return (errors);
  },
  lastName: (lastname) => {
    const errors = [];
    if (textError(lastname)) {
      errors.push('register.error.notNumberOrLetter');
    }
    return (errors);
  },
  password: (password) => {
    const errors = schema.validate(password, { list: true });
    return (errors);
  },

};

export function handleClickShowPassword() {
  const { showPassword } = this.state;
  this.setState({ showPassword: !showPassword });
}

export function toggleLocale() {
  let { locale } = this.props;
  const { handleSetLocale } = this.props;

  if (locale === 'en') {
    locale = 'fr';
  } else {
    locale = 'en';
  }
  handleSetLocale(locale);
}

export function toggleTheme() {
  let { darkTheme } = this.props;
  const { handleToggleDarkTheme } = this.props;

  if (darkTheme) {
    darkTheme = false;
  } else {
    darkTheme = true;
  }
  handleToggleDarkTheme();
}

export function handleSubmit(e) {
  e.preventDefault();
  let willSend = true;
  const {
    userName, userNameError,
    firstName, firstNameError,
    lastName, lastNameError,
    email, emailError,
    password, passwordError,
    image,
  } = this.state;
  const {
    registerUserHandler,
    setErrorHandler,
    locale,
    darkTheme,
  } = this.props;

  if (userName === '' && userNameError.length === 0) {
    userNameError.push('register.error.noUserName');
  } if (email === '' && emailError.length === 0) {
    emailError.push('register.error.noEmail');
  } if (firstName === '' && firstNameError.length === 0) {
    firstNameError.push('register.error.noFirstName');
  } if (lastName === '' && lastNameError.length === 0) {
    lastNameError.push('register.error.noLastName');
  } if (password === '' && passwordError.length === 0) {
    passwordError.push('register.error.noPassword');
  } if (!image.rawData) {
    image.error = 'register.error.missingImage';
  } else { image.error = ''; }
  if (image.error.length !== 0
    || userNameError.length !== 0
    || emailError.length !== 0
    || firstNameError.length !== 0
    || lastNameError.length !== 0
    || (passwordError.length !== 0)) {
    willSend = false;
    setErrorHandler('register.error.formInvalid');
    this.setState({
      userNameError,
      emailError,
      firstNameError,
      lastNameError,
      passwordError,
      image,
    });
  }
  const formData = {
    userName,
    firstName,
    lastName,
    email,
    password,
    locale,
    darkTheme,
  };
  const form = new FormData();
  Object.keys(formData).forEach((key) => {
    form.append(key, formData[key]);
  });
  if (image.inputFile) {
    image.inputFile = dataURItoBlob(image.rawData);
  }
  form.append('image', image.inputFile);
  if (willSend) {
    registerUserHandler(form);
  }
}

export default handlers;

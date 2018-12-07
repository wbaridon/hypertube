import * as EmailValidator from 'email-validator';
import { dataURItoBlob } from './image-handle-functions';

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
    if (firstname === 'guillaum!') {
      errors.push('guillaume is a bad name');
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
    const errors = [];
    if (password.length < 6) {
      errors.push('register.error.passwordLengthTooShort');
    } else if (password.length > 16) {
      errors.push('register.error.passwordLengthTooLong');
    }
    return (errors);
  },

};

export function handleClickShowPassword() {
  const { showPassword } = this.state;
  this.setState({ showPassword: !showPassword });
}

export function toggleLocale() {
  let { locale } = this.state;

  if (locale === 'en') {
    locale = 'fr';
  } else {
    locale = 'en';
  }
  this.setState({ locale });
}

export function toggleTheme() {
  let { darkTheme } = this.state;

  if (darkTheme) {
    darkTheme = false;
  } else {
    darkTheme = true;
  }
  this.setState({ darkTheme });
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
    locale,
    darkTheme,
    image,
  } = this.state;
  const { registerUserHandler } = this.props;

  if (userName === '') {
    userNameError.push('register.error.noUserName');
  } if (email === '') {
    emailError.push('register.error.noEmail');
  } if (firstName === '') {
    firstNameError.push('register.error.noFirstName');
  } if (lastName === '') {
    lastNameError.push('register.error.noLastName');
  } if (password === '') {
    passwordError.push('register.error.noPassword');
  } if (!image.rawData) {
    image.error = 'register.error.missingImage';
  }
  if (image.error.length !== 0
    || userNameError.length !== 0
    || emailError.length !== 0
    || firstNameError.length !== 0
    || lastNameError.length !== 0
    || passwordError.length !== 0) {
    willSend = false;
    this.setState({
      userNameError,
      emailError,
      firstNameError,
      lastNameError,
      passwordError,
      image,
    });
  }
  console.log(
    userNameError,
    emailError,
    firstNameError,
    lastNameError,
    passwordError,
    image.error);
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

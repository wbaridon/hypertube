import * as EmailValidator from 'email-validator';

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
      errors.push('register.notNumberOrLetter');
    }
    return (errors);
  },
  email: (email) => {
    const errors = [];
    if (!EmailValidator.validate(email) && email !== '') {
      errors.push('register.emailBadFormat');
    }
    return (errors);
  },
  firstName: (firstname) => {
    const errors = [];
    if (textError(firstname)) {
      errors.push('register.notNumberOrLetter');
    }
    if (firstname === 'guillaum!') {
      errors.push('guillaume is a bad name');
    }
    return (errors);
  },
  lastName: (lastname) => {
    const errors = [];
    if (textError(lastname)) {
      errors.push('register.notNumberOrLetter');
    }
    return (errors);
  },
  password: (password) => {
    const errors = [];
    if (password.length < 6) {
      errors.push('register.passwordLengthTooShort');
    } else if (password.length > 16) {
      errors.push('register.passwordLengthTooLong');
    }
    return (errors);
  },
};

export default handlers;

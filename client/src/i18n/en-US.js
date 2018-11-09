
const flatten = require('flat');


const enUS = {
  login: {
    userName: 'User name',
    email: 'Email',
    password: 'Password',
    loginButton: 'Sign In',
  },
  register: {
    title: 'REGISTER',
    notNumberOrLetter: 'Invalid Character',
    emailBadFormat: 'Improperly formatted email',
    userName: 'User name',
    email: 'Email',
    firstName: 'First Name',
    lastName: 'Last Name',
    password: 'Password',
    passwordLengthTooShort: 'Too short',
    passwordLengthTooLong: 'Too long',
    submit: 'Submit',
    profilePicture: 'Change photo',
    addImage: 'Add Photo',
    registerWith42: '42 Auth',
    userAlreadyRegistered: 'A user with that username or email already exists...',
  },
};

export default flatten(enUS);

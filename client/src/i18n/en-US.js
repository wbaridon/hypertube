
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
    userName: 'User name',
    email: 'Email',
    firstName: 'First Name',
    lastName: 'Last Name',
    password: 'Password',
    submit: 'Submit',
    profilePicture: 'Change photo',
    addImage: 'Add Photo',
    registerWith42: '42 Auth',
    registerWithGithub: 'GitHub Auth',
    registerWithGoogle: 'Google Auth',
    error: {
      userAlreadyRegistered: 'A user with that username or email already exists...',
      passwordLengthTooLong: 'Too long',
      passwordLengthTooShort: 'Too short',
      emailBadFormat: 'Improperly formatted email',
      notNumberOrLetter: 'Invalid Character',
      noUserName: 'please enter a valid username',
      noEmail: 'Please enter your email',
      noFirstName: 'Please enter your first name',
      noLastName: 'Please enter your last name',
      noPassword: 'Enter a valid password',
      missingImage: 'Please upload a valid image',
      formInvalid: 'Please do not forget anything',
    },
  },
  error: {
    'Network Error': 'Failed to connect to API',
  },
  success: {
    login: 'Successfully logged in!',
  },
};

export default flatten(enUS);


const flatten = require('flat');


const enUS = {
  resetPassword: {
    title: 'Hi, if you\'ve forgotten your password, enter your email below!',
    resetForEmail: 'Hi {email}, Enter your new password twice below!',
    email: 'email',
    newPassword: 'New password',
    newPasswordRepeat: 'Repeat password',
    submit: 'Confirm',
  },
  changePassword: {
    uppercase: 'Missing uppercase letter',
    lowercase: 'Missing lowercase letter',
    min: 'Need at least 8 characters',
    max: 'No more than 30 characters',
    digits: 'Missing digit',
    spaces: 'Cannot contain spaces',
    notEqual: 'Passwords do not match',
  },
  settings: {
    userName: 'Username:',
    firstName: 'First Name:',
    lastName: 'Last Name:',
    email: 'Email:',
    darkTheme: 'Dark Theme:',
    locale: 'Locale:',
  },
  navigation: {
    error: {
      notAuthed: 'You are not permitted to view the page',
    },
  },
  logout: {
    logoutButton: 'Sign out',
  },
  login: {
    userName: 'User name',
    email: 'Email',
    password: 'Password',
    loginButton: 'Sign In',
    provider: {
      google: 'Sign in with Google',
      github: 'Sign in with Github',
      fortytwo: 'Sign in with 42',
      gitlab: 'Sign in with Gitlab',
      reddit: 'Sign in with Reddit',
    },
    forgotPassword: 'Forgot something?',
  },
  api: {
    success: {
      login: 'Successfully logged in!',
    },
    error: {
      login: 'Login error',
      'Network Error': 'Failed to connect to API',
    },
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
    provider: {
      google: 'Register with Google',
      github: 'Register with GitHub',
      fortytwo: 'Register with 42',
      gitlab: 'Register with Gitlab',
      reddit: 'Register with Reddit',
    },
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
};

export default flatten(enUS);

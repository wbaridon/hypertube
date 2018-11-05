
const flatten = require('flat');


const enUS = {
  register: {
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
  },
};

export default flatten(enUS);

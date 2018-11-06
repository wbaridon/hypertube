
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
    profilePicture: 'Change photo',
    addImage: 'Add Photo',
    registerWith42: '42 Auth',
  },
};

export default flatten(enUS);

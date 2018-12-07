
const flatten = require('flat');


const frFR = {
  login: {
    userName: 'Nom d\'Utilisateur',
    email: 'Email',
    password: 'Mot de Passe',
    loginButton: 'Se Connecter',
  },
  register: {
    title: 'INSCRIPTION',
    notNumberOrLetter: 'Mauvais charactere',
    emailBadFormat: 'Mauvais format de mail',
    userName: 'Nom d\'Utilisateur',
    email: 'Email',
    firstName: 'Prenom',
    lastName: 'Nom',
    password: 'Mot de Passe',
    passwordLengthTooShort: 'Trop court',
    passwordLengthTooLong: 'Trop long',
    submit: 'Envoyer',
    profilePicture: 'Changer',
    addImage: 'Charger une image',
    registerWith42: '42 Auth',
    userAlreadyRegistered: 'A user with that username or email already exists...',
  },
  error: {
    'Network Error': 'Impossible de se connecter a l\'API',
  },
};

export default flatten(frFR);

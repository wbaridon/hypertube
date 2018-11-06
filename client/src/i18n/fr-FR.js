
const flatten = require('flat');


const frFR = {
  register: {
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
  },
};

export default flatten(frFR);

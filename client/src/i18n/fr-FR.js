
const flatten = require('flat');


const frFR = {
  watchList: {
    title: 'Ma liste',
    subtitle: 'Quels films regarder ?',
    remove: 'Supprimer',
    watchnow: 'Regarder',
    markseen: 'jamais vu',
    markunseen: 'deja vu',
  },
  movies: {
    watch: 'Regarder',
    addList: '+ ma liste',
    deleteList: '- ma liste',
  },
  movie: {
    year: 'Année: ',
    runtime: 'Durée: ',
    genre: 'Genre: ',
    director: 'Réalisateur: ',
    actors: 'Acteurs: ',
    awards: 'Prix: ',
    rating: 'Note: ',
    comments: 'Commentaires',
    submit: 'Envoyer',
    noComments: 'Pas encore de commentaires :(',
    commentInput: 'Commenter',
    worte: 'a ecrit',
    at: 'à ',
    the: ' le ',
    markSeen: ' marquer comme deja vu',
    markUnseen: 'marquer comme jamais vu',
    error: 'Oups, on dirait que votre film n\'existe pas',
    loading: 'loading',
    deleteList: '- ma liste',
  },
  login: {
    userName: 'Nom d\'Utilisateur',
    email: 'Email',
    password: 'Mot de Passe',
    loginButton: 'Se Connecter',
  },
  api: {
    success: {
      login: 'Bienvenu !',
    },
    error: {
      login: 'Erreur de connection',
      'Network Error': 'Impossible de se connecter a l\'API',
      cantConnectToDb: 'Impossible de se connecter a l\'API...',
    },
  },
  logout: {
    logoutButton: 'Déconnexion',
  },
  settings: {
    userName: 'Nom d\'utilisateur:',
    firstName: 'Prénom:',
    lastName: 'Nom:',
    email: 'Email:',
    darkTheme: 'Tenebres:',
    locale: 'Locale:',
  },
  register: {
    title: 'INSCRIPTION',
    userName: 'Nom d\'Utilisateur',
    email: 'Email',
    firstName: 'Prenom',
    lastName: 'Nom',
    password: 'Mot de Passe',
    submit: 'Envoyer',
    profilePicture: 'Changer',
    addImage: 'Charger une image',
    registerWith42: '42 Auth',
    registerWithGithub: 'GitHub Auth',
    registerWithGoogle: 'Google Auth',
    error: {
      userAlreadyRegistered: 'Un utilisateur avec ce nom d\'utilisateur existe deja...',
      passwordLengthTooLong: 'Trop long',
      passwordLengthTooShort: 'Trop court',
      emailBadFormat: 'Email mal formatté',
      notNumberOrLetter: 'Mauvais charactere',
      noUserName: 'Entrez un nom d\'utilisateur valide',
      noEmail: 'Entrez votre Email',
      noFirstName: 'Entrez votre prénom',
      noLastName: 'Entrez votre nom de famille',
      noPassword: 'Enter un mot de passe valide',
      missingImage: 'Chargez une photo valide',
      formInvalid: 'Noubliez rien SVP',
    },
  },
  error: {
    'Network Error': 'Impossible de se connecter a l\'API',
  },
  success: {
    login: 'Bienvenue !',
  },
};

export default flatten(frFR);

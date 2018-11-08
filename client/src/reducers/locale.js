const locale = (state = 'en', action) => {
  switch (action.type) {
    case 'SET_LOCALE':
      return action.locale;
    default:
      return state;
  }
};

export default locale;

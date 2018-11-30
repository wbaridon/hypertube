import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider, addLocaleData } from 'react-intl';
import { SnackbarProvider } from 'notistack';
import { connect } from 'react-redux';
import {
  checkUserInCookie,
} from 'Actions';
import enUS from './i18n/en-US';
import frFR from './i18n/fr-FR';
import CurrentRoute from './components/routing/current-route';
import Header from './components/header/header';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#39796b',
      main: '#004d40',
      dark: '#00251a',
    },
    secondary: {
      light: '#bc477b',
      main: '#880e4f',
      dark: '#560027',
    },
  },
  typography: {
    useNextVariants: true,
  },
});

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      light: '#39796b',
      main: '#004d40',
      dark: '#00251a',
    },
    secondary: {
      light: '#bc477b',
      main: '#880e4f',
      dark: '#560027',
    },
  },
  typography: {
    useNextVariants: true,
  },
});


addLocaleData([...en, ...fr]);

function mapStateToProps(state) {
  return {
    locale: state.locale,
    darkThemeBool: state.darkTheme,
    token: state.user.token,
  };
}
function mapDispatchToProps(dispatch) {
  return ({
    checkUser: () => dispatch(checkUserInCookie(document.cookie)),
  });
}

function App({
  locale,
  darkThemeBool,
  checkUser,
  token,
}) {
  const messages = locale === 'fr' ? frFR : enUS;
  if (token === '') {
    checkUser();
  }
  const root = document.documentElement;
  root.style.setProperty('--autocomplete-color', darkThemeBool ? darkTheme.palette.getContrastText(darkTheme.palette.background.paper) : theme.palette.getContrastText(theme.palette.background.paper));
  root.style.setProperty('--autocomplete-background-color', darkThemeBool ? darkTheme.palette.background.paper : theme.palette.background.paper);
  root.style.setProperty('--autocomplete-primary-color', darkThemeBool ? darkTheme.palette.getContrastText(darkTheme.palette.primary.main) : theme.palette.getContrastText(theme.palette.primary.main));
  root.style.setProperty('--autocomplete-primary-background-color', darkThemeBool ? darkTheme.palette.primary.main : theme.palette.primary.main);
  return (
    <SnackbarProvider>
      <IntlProvider locale={locale} messages={messages}>
        <BrowserRouter>
          <MuiThemeProvider theme={darkThemeBool ? darkTheme : theme}>
            <CssBaseline>
              <Header />
              <CurrentRoute />
            </CssBaseline>
          </MuiThemeProvider>
        </BrowserRouter>
      </IntlProvider>
    </SnackbarProvider>
  );
}
App.propTypes = {
  locale: PropTypes.string.isRequired,
  darkThemeBool: PropTypes.bool.isRequired,
  checkUser: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

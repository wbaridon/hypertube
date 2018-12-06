import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter } from 'react-router-dom';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import {
  checkUserInCookie,
} from 'Actions';

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

function mapStateToProps(state) {
  return {
    locale: state.locale,
    darkThemeBool: state.darkTheme,
    token: state.user.token,
    error: state.user.error,
  };
}
function mapDispatchToProps(dispatch) {
  return ({
    checkUser: () => dispatch(checkUserInCookie(document.cookie)),
  });
}


function App({
  darkThemeBool,
}) {
  const root = document.documentElement;
  root.style.setProperty('--autocomplete-color', darkThemeBool ? darkTheme.palette.getContrastText(darkTheme.palette.background.paper) : theme.palette.getContrastText(theme.palette.background.paper));
  root.style.setProperty('--autocomplete-background-color', darkThemeBool ? darkTheme.palette.background.paper : theme.palette.background.paper);
  root.style.setProperty('--autocomplete-primary-color', darkThemeBool ? darkTheme.palette.getContrastText(darkTheme.palette.primary.main) : theme.palette.getContrastText(theme.palette.primary.main));
  root.style.setProperty('--autocomplete-primary-background-color', darkThemeBool ? darkTheme.palette.primary.main : theme.palette.primary.main);
  return (
    <BrowserRouter>
      <MuiThemeProvider theme={darkThemeBool ? darkTheme : theme}>
        <CssBaseline>
          <Header />
          <CurrentRoute />
        </CssBaseline>
      </MuiThemeProvider>
    </BrowserRouter>
  );
}
App.propTypes = {
  darkThemeBool: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl((withSnackbar((App)))));

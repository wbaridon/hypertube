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
  getUserInfoPrivate,
  clearError,
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
    user: state.user,
    token: state.user.token,
    lastAction: state.user.lastAction,
    error: state.user.error,
    tokenValid: state.user.tokenValid,
  };
}
function mapDispatchToProps(dispatch) {
  return ({
    checkUser: () => dispatch(checkUserInCookie(document.cookie)),
    getUserPrivate: token => dispatch(getUserInfoPrivate(token)),
    clearErrorHandler: () => dispatch(clearError()),
  });
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastAction: props.lastAction,
      enqueueSnackbar: props.enqueueSnackbar,
    };
  }

  componentDidUpdate = (prevProps, prevState) => {
    const prevLastAction = prevState.lastAction;
    const { enqueueSnackbar } = prevState;
    const {
      user,
      token,
      lastAction,
      checkUser,
      getUserPrivate,
      error,
      clearErrorHandler,
      intl,
      tokenValid,
    } = this.props;
    if ((!user.data || (user.data && !user.data.firstName)) && token === '' && lastAction !== 'CHECK_USER_IN_COOKIE') {
      checkUser();
    }
    if ((!user.data || (user.data && !user.data.firstName)) && tokenValid && lastAction !== 'GET_USER_INFO_PRIVATE') {
      getUserPrivate(token);
    }
    if (error) {
      enqueueSnackbar(intl.formatMessage({ id: error }), { variant: 'error' });
      clearErrorHandler();
    }
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   const prevLastAction = prevState.lastAction;
  //   const { enqueueSnackbar } = prevState;
  //   const {
  //     user,
  //     token,
  //     lastAction,
  //     checkUser,
  //     getUserPrivate,
  //     error,
  //     clearErrorHandler,
  //     intl,
  //     tokenValid,
  //   } = nextProps;
  //   if ((!user.data || (user.data && !user.data.firstName)) && token === '' && lastAction !== 'CHECK_USER_IN_COOKIE') {
  //     checkUser();
  //   }
  //   if ((!user.data || (user.data && !user.data.firstName)) && tokenValid) {
  //     getUserPrivate(token);
  //   }
  //   if (error) {
  //     enqueueSnackbar(intl.formatMessage({ id: error }), { variant: 'error' });
  //     clearErrorHandler();
  //   }
  //   return null;
  // }

  render() {
    const { darkThemeBool } = this.props;
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
}
App.propTypes = {
  darkThemeBool: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired, // eslint-disable-line
  user: PropTypes.shape({}).isRequired,
  checkUser: PropTypes.func.isRequired, // eslint-disable-line
  getUserPrivate: PropTypes.func.isRequired, // eslint-disable-line
  lastAction: PropTypes.string.isRequired, // eslint-disable-line
  enqueueSnackbar: PropTypes.func.isRequired,
  clearErrorHandler: PropTypes.func.isRequired, // eslint-disable-line
  intl: intlShape.isRequired, // eslint-disable-line
  error: PropTypes.string, // eslint-disable-line
  tokenValid: PropTypes.bool.isRequired,
};

App.defaultProps = {
  error: '',
};

export default withSnackbar(connect(mapStateToProps, mapDispatchToProps)(injectIntl(((App)))));

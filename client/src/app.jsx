import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter } from 'react-router-dom';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import {
  checkUserInCookieA,
  clearErrorA,
  clearSuccessA,
} from 'Actions';
import CurrentRoute from './components/routing/current-route';
import Header from './components/header/header';
import Footer from './components/header/footer';
import Sidebar from './components/sidebar';

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

const styles = {
  routeContainer: {
    marginBottom: '70px',
  },
};

function mapStateToProps(state) {
  return {
    locale: state.user.data.locale,
    darkThemeBool: state.user.data.darkTheme,
    user: state.user,
    error: state.notifications.error,
    success: state.notifications.success,
    data: state.notifications.data,
  };
}
function mapDispatchToProps(dispatch) {
  return ({
    checkUser: () => dispatch(checkUserInCookieA(document.cookie)),
    clearErrorHandler: () => dispatch(clearErrorA()),
    clearSuccessHandler: () => dispatch(clearSuccessA()),
  });
}


class App extends React.Component {
  componentDidMount = () => {
    const {
      user,
      checkUser,
    } = this.props;
    if (!user.token && !user.tokenFetched) {
      checkUser();
    }
  }

  componentDidUpdate = () => {
    const {
      error,
      enqueueSnackbar,
      intl,
      clearErrorHandler,
      clearSuccessHandler,
      success,
      data,
    } = this.props;
    if (error) {
      enqueueSnackbar(`${intl.formatMessage({ id: error })}${data ? ': ' : ''}${data}`, { autoHideDuration: 1300, variant: 'error' });
      clearErrorHandler();
    }
    if (success) {
      enqueueSnackbar(`${intl.formatMessage({ id: success })}${data ? ': ' : ''}${data}`, { autoHideDuration: 1300, variant: 'success' });
      clearSuccessHandler();
    }
  }


  render() {
    const {
      darkThemeBool,
    } = this.props;
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
            <Sidebar />
            <CurrentRoute />
            <Footer />
          </CssBaseline>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}
App.propTypes = {
  darkThemeBool: PropTypes.bool.isRequired,
  user: PropTypes.shape({}).isRequired,
  checkUser: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  clearErrorHandler: PropTypes.func.isRequired,
  clearSuccessHandler: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  error: PropTypes.string,
  success: PropTypes.string,
  data: PropTypes.string,
};

App.defaultProps = {
  error: '',
  success: '',
  data: '',
};

export default withSnackbar(connect(mapStateToProps, mapDispatchToProps)(injectIntl(App)));

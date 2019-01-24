import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import createBreakpoints from "@material-ui/core/styles/createBreakpoints";
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

function pxToRem(value) {
  return `${value / 16}rem`;
}
const breakpoints = createBreakpoints({});
const theme = createMuiTheme({
  breakpoints,
  overrides: {
    MuiTypography: {
      body2: {
        fontSize: pxToRem(12),
        [breakpoints.up('sm')]: {
          fontSize: pxToRem(12),
        },
        [breakpoints.up('md')]: {
          fontSize: pxToRem(14),
        },
        [breakpoints.up('lg')]: {
          fontSize: pxToRem(16),
        },
      },
      button: {
        fontSize: pxToRem(12),
        [breakpoints.up('sm')]: {
          fontSize: pxToRem(12),
        },
        [breakpoints.up('md')]: {
          fontSize: pxToRem(14),
        },
        [breakpoints.up('lg')]: {
          fontSize: pxToRem(16),
        },
      },
    },
  },
  palette: {
    primary: {
      light: '#484848',
      main: '#212121',
      dark: '#000',
    },
    secondary: {
      light: '#ccc',
      main: '#ccc',
      dark: '#ccc',
    },
  },
  typography: {
    useNextVariants: true,
  },
});

const darkTheme = createMuiTheme({
  breakpoints,
  overrides: {
    MuiTypography: {
      body2: {
        fontSize: pxToRem(10),
        [breakpoints.up('sm')]: {
          fontSize: pxToRem(12),
        },
        [breakpoints.up('md')]: {
          fontSize: pxToRem(14),
        },
        [breakpoints.up('lg')]: {
          fontSize: pxToRem(16),
        },
      },
      button: {
        fontSize: pxToRem(10),
        [breakpoints.up('sm')]: {
          fontSize: pxToRem(12),
        },
        [breakpoints.up('md')]: {
          fontSize: pxToRem(14),
        },
        [breakpoints.up('lg')]: {
          fontSize: pxToRem(16),
        },
      },
    },
  },
  palette: {
    type: 'dark',
    primary: {
      light: '#484848',
      main: '#212121',
      dark: '#000',
    },
    secondary: {
      light: '#ccc',
      main: '#ccc',
      dark: '#ccc',
    },
  },
  typography: {
    useNextVariants: true,
  },
});

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

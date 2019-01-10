import React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Toolbar,
  IconButton,
  MuiThemeProvider,
  createMuiTheme,
  withStyles,
} from '@material-ui/core';
import Home from '@material-ui/icons/Home';
import Power from '@material-ui/icons/Power';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  toggleDarkTheme,
  setLocale,
  openSidebar,
} from 'Actions/index';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ffffff',
      main: '#ffffff',
      dark: '#ffffff',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#ffffff',
      main: '#000000',
      dark: '#ffffff',
      contrastText: '#ffffff',
    },
    text: {
      primary: '#fff',
      secondary: '#fff',
    },
  },
  typography: {
    useNextVariants: true,
  },
});


const mapDispatchToProps = dispatch => ({
  toggleDarkThemeHandler: () => dispatch(toggleDarkTheme()),
  changeLocale: locale => dispatch(setLocale(locale)),
  handleOpenSidebar: () => dispatch(openSidebar()),
});

const mapStateToProps = state => ({
  darkThemeBool: state.darkTheme,
  locale: state.locale,
});

const styles = {
  appBar: {
  },
  spacer: {
    flexGrow: 1,
  },
};

class Header extends React.Component {
  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    const {
      classes,
      handleOpenSidebar,
    } = this.props;
    return (
      <AppBar position="sticky" className={classes.appBar}>
        <MuiThemeProvider theme={theme}>
          <Toolbar>
            <IconButton component={Link} to="/" color="primary">
              <Home />
            </IconButton>
            <span className={classes.spacer} />
            <IconButton onClick={handleOpenSidebar}>
              <Power color="primary" />
            </IconButton>
          </Toolbar>
        </MuiThemeProvider>
      </AppBar>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  handleOpenSidebar: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)((Header)));

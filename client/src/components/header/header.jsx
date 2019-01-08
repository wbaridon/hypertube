import React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Toolbar,
  IconButton,
  MuiThemeProvider,
  createMuiTheme,
  Typography,
  withStyles,
} from '@material-ui/core';
import Home from '@material-ui/icons/Home';
import Power from '@material-ui/icons/Power';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  toggleDarkTheme,
  setLocale,
  openSidebar,
} from 'Actions/index';
import withWidth from '@material-ui/core/withWidth';

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
      width,
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
  toggleDarkThemeHandler: PropTypes.func.isRequired,
  darkThemeBool: PropTypes.bool.isRequired,
  changeLocale: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
  handleOpenSidebar: PropTypes.func.isRequired,
  width: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withWidth()((Header))));

import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import lightBlue from '@material-ui/core/colors/lightBlue';
import orange from '@material-ui/core/colors/orange';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider, addLocaleData } from 'react-intl';
import { connect } from 'react-redux';
import enUS from './i18n/en-US';
import frFR from './i18n/fr-FR';
import CurrentRoute from './components/routing/current-route';
import Header from './components/header/header';

const theme = createMuiTheme({
  palette: {
    primary: lightBlue,
    secondary: orange,
  },
  status: {
    danger: 'orange',
  },
  typography: {
    useNextVariants: true,
  },
});

addLocaleData([...en, ...fr]);

function mapStateToProps(state) {
  return { locale: state.locale };
}

function App({ locale }) {
  const messages = locale === 'fr' ? frFR : enUS;

  return (
    <IntlProvider locale={locale} messages={messages}>
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <Header />
          <CurrentRoute />
        </MuiThemeProvider>
      </BrowserRouter>
    </IntlProvider>
  );
}
App.propTypes = {
  locale: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(App);

import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import lightBlue from '@material-ui/core/colors/lightBlue';
import orange from '@material-ui/core/colors/orange';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import { IntlProvider, addLocaleData } from 'react-intl';
import { withCookies, Cookies, CookiesProvider } from 'react-cookie';
import enUS from './i18n/en-US';
import frFR from './i18n/fr-FR';
import CurrentRoute from './components/routing/current-route';

const theme = createMuiTheme({
  palette: {
    primary: lightBlue,
    secondary: orange,
  },
  status: {
    danger: 'orange',
  },
});
const history = createBrowserHistory();

addLocaleData([...en, ...fr]);

class App extends React.Component {
  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      locale: cookies.get('locale') || 'en',
      messages: cookies.get('locale') === 'fr' ? frFR : enUS,
    };
    this.changeLocale = this.changeLocale.bind(this);
  }

  changeLocale() {
    const { locale } = this.state;
    const { cookies } = this.props;
    const newlocale = locale === 'en' ? 'fr' : 'en';
    cookies.set('locale', newlocale);
    this.setState({ locale: newlocale, messages: newlocale === 'fr' ? frFR : enUS });
  }

  render() {
    const { locale, messages } = this.state;

    return (
      <Router history={history}>
        <CookiesProvider>
          <IntlProvider locale={locale} messages={messages}>
            <MuiThemeProvider theme={theme}>
              <CurrentRoute />
            </MuiThemeProvider>
          </IntlProvider>
        </CookiesProvider>
      </Router>
    );
  }
}

App.propTypes = {
  cookies: PropTypes.instanceOf(Cookies).isRequired,
};

export default withCookies(App);

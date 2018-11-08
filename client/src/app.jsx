import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import lightBlue from '@material-ui/core/colors/lightBlue';
import orange from '@material-ui/core/colors/orange';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { IntlProvider, addLocaleData } from 'react-intl';
import { withCookies, Cookies, CookiesProvider } from 'react-cookie';
import enUS from './i18n/en-US';
import frFR from './i18n/fr-FR';
import CurrentRoute from './components/routing/current-route';
import rootReducer from './reducers/index';

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
const store = createStore(rootReducer, applyMiddleware(thunk));

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
      <Provider store={store}>
        <IntlProvider locale={locale} messages={messages}>
          <BrowserRouter>
            <CookiesProvider>
              <MuiThemeProvider theme={theme}>
                <CurrentRoute />
              </MuiThemeProvider>
            </CookiesProvider>
          </BrowserRouter>
        </IntlProvider>
      </Provider>
    );
  }
}
App.propTypes = {
  cookies: PropTypes.instanceOf(Cookies).isRequired,
};

export default withCookies(App);

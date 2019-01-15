import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, addLocaleData } from 'react-intl';
import { connect } from 'react-redux';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';
import { SnackbarProvider } from 'notistack';
import App from './app';
import enUS from './i18n/en-US';
import frFR from './i18n/fr-FR';

addLocaleData([...en, ...fr]);

const mapStateToProps = state => ({
  locale: state.user.data.locale,
});

function AppWrapper({ locale }) {
  const messages = locale === 'fr' ? frFR : enUS;

  return (
    <SnackbarProvider>
      <IntlProvider locale={locale} messages={messages}>
        <App />
      </IntlProvider>
    </SnackbarProvider>
  );
}

AppWrapper.propTypes = {
  locale: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(AppWrapper);

import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, addLocaleData } from 'react-intl';
import { connect } from 'react-redux';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';
import App from './app';
import enUS from './i18n/en-US';
import frFR from './i18n/fr-FR';

addLocaleData([...en, ...fr]);

const mapStateToProps = state => ({
  locale: state.locale,
});

function AppWrapper({ locale }) {
  const messages = locale === 'fr' ? frFR : enUS;
  console.log(locale);

  return (
    <IntlProvider locale={locale} messages={messages}>
      <App />
    </IntlProvider>
  );
}

AppWrapper.propTypes = {
  locale: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(AppWrapper);

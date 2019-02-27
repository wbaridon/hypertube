import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, addLocaleData } from 'react-intl';
import { connect } from 'react-redux';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';
import { SnackbarProvider } from 'notistack';
import { withStyles } from '@material-ui/core/styles';
import App from './app';
import enUS from './i18n/en-US';
import frFR from './i18n/fr-FR';

addLocaleData([...en, ...fr]);

const styles = {
  success: {
    marginBottom: 56,
  },
  error: {
    marginBottom: 56,
  },
  warning: {
    marginBottom: 56,
  },
  info: {
    marginBottom: 56,
  },
};

const mapStateToProps = state => ({
  locale: state.user.data.locale || state.locale,
});

function AppWrapper({ locale, classes }) {
  const messages = locale === 'fr' ? frFR : enUS;

  return (
    <SnackbarProvider classes={{
      variantSuccess: classes.success,
      variantError: classes.error,
      variantWarning: classes.warning,
      variantInfo: classes.info,
    }}
    >
      <IntlProvider locale={locale} messages={messages}>
        <App />
      </IntlProvider>
    </SnackbarProvider>
  );
}

AppWrapper.propTypes = {
  locale: PropTypes.string.isRequired,
  classes: PropTypes.shape({}).isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)((AppWrapper)));

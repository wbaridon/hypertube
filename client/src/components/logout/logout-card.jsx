import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActions,
  Button,
  Typography,
} from '@material-ui/core';
import {
  FormattedMessage,
  injectIntl,
  intlShape,
} from 'react-intl';

const styles = {
  card: {
    width: 310,
  },
};

function LogoutCard({
  parentLogoutHandle,
  classes,
}) {
  return (
    <Card className={classes.card}>
      <form action="" onSubmit={e => parentLogoutHandle(e)}>
        <CardActions>
          <Button type="submit" onClick={parentLogoutHandle}>
            {(
              <Typography>
                <FormattedMessage id="logout.logoutButton" />
              </Typography>
            )}
          </Button>
        </CardActions>
      </form>
    </Card>
  );
}

LogoutCard.propTypes = {
  parentLogoutHandle: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(injectIntl(LogoutCard));

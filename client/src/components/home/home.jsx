import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Button } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';

const myStyles = {
  root: {
    width: '52px',
  },
};

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      fakestate: '283',
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(fakestate) {
    this.setState({ fakestate });
  }

  render() {
    const { fakestate } = this.state;
    const { classes } = this.props;

    return (
      <Grid container spacing={0} alignItems="center" justify="center">
        <Grid item xs={11} sm={10} md={9}>
          <FormattedMessage id="example" className={classes.root} />
          <Button onClick={this.handleClick} label={fakestate}>{fakestate}</Button>
        </Grid>
      </Grid>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

Home.url = '/';
export default withStyles(myStyles)(Home);

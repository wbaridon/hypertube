import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  setWarningA,
} from '../../redux/actions';

const mapDispatchToProps = dispatch => ({
  setErrorHandler: routeUrl => dispatch(setWarningA('navigation.error.notAuthed', `: ${routeUrl}`)),
});

const mapStateToProps = state => ({
  authed: state.user.tokenValid && state.user.dataFetched,
});

class Home extends React.Component {
  componentWillMount() {
    const {
      setErrorHandler,
      location,
      history,
    } = this.props;

    if (location.state && location.state.from) {
      setErrorHandler(location.state.from);
      history.replace({
        pathname: '/',
        state: {},
      });
    }
  }

  render() {
    const {
      authed,
    } = this.props;
    return (
      authed
        ? <Redirect to="/movies" />
        : (
          <Grid container direction="column" justify="center" alignItems="center" alignContent="center">
            <Grid item>
              <Typography inline variant="h1">
                H
              </Typography>
              <Typography inline variant="h4">
                yper
              </Typography>
            </Grid>
            <Grid item>
              <Typography inline variant="h1">
                Y
              </Typography>
              <Typography inline variant="h4">
                olo
              </Typography>
            </Grid>
            <Grid item>
              <Typography inline variant="h1">
                P
              </Typography>
              <Typography inline variant="h4">
                roper
              </Typography>
            </Grid>
            <Grid item>
              <Typography inline variant="h1">
                E
              </Typography>
              <Typography inline variant="h4">
                vil
              </Typography>
            </Grid>
            <Grid item>
              <Typography inline variant="h1">
                R
              </Typography>
              <Typography inline variant="h4">
                etro
              </Typography>
            </Grid>
            <Grid item>
              <Typography inline variant="h1">
                T
              </Typography>
              <Typography inline variant="h4">
                echnological
              </Typography>
            </Grid>
            <Grid item>
              <Typography inline variant="h1">
                U
              </Typography>
              <Typography inline variant="h4">
                ltimate
              </Typography>
            </Grid>
            <Grid item>
              <Typography inline variant="h1">
                B
              </Typography>
              <Typography inline variant="h4">
                rowsing
              </Typography>
            </Grid>
            <Grid item>
              <Typography inline variant="h1">
                E
              </Typography>
              <Typography inline variant="h4">
                xperience
              </Typography>
            </Grid>
          </Grid>
        ));
  }
}

Home.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      from: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({}).isRequired,
  setErrorHandler: PropTypes.func.isRequired,
  authed: PropTypes.bool.isRequired,
};

Home.url = '/';
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));

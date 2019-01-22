import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
  setErrorA,
} from '../../redux/actions';

const myStyles = theme => ({
  poster: {
    maxWidth: '200px',
    [theme.breakpoints.down(700)]: {
      maxWidth: '150px',
    },
    [theme.breakpoints.down(400)]: {
      maxWidth: '75px',
    },
  },
});

const mapDispatchToProps = dispatch => ({
  setErrorHandler: routeUrl => dispatch(setErrorA('navigation.error.notAuthed', `: ${routeUrl}`)),
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
    return (<div>Home</div>);
  }
}

Home.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      from: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({}).isRequired,
  setErrorHandler: PropTypes.func.isRequired,
};

Home.url = '/';
export default withRouter(connect(null, mapDispatchToProps)(withStyles(myStyles)(Home)));

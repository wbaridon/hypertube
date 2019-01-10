import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setErrorA } from 'Actions';
import Home from '../home/home';
import Register from '../register/register';
import Video from '../video/video';
import Movie from '../movie/movie';
import Settings from '../settings/settings';
import ForgotPassword from '../forgot-password';
import LoadingDots from '../loading-dots';

const mapStateToProps = state => ({
  authed: state.user.tokenValid,
  protectedRouteLoading: state.protectedRouteLoading,
});

const mapDispatchToProps = dispatch => ({
  setErrorHandler: () => dispatch(setErrorA('navigation.error.notAuthed')),
});

const PrivateRoute = connect(mapStateToProps, mapDispatchToProps)(({
  component:
  Component,
  authed,
  protectedRouteLoading,
  setErrorHandler,
  ...rest
}) => (<Route
  {...rest}
  render={(props) => {
    if (protectedRouteLoading) {
      return (<LoadingDots />);
    }
    if (!protectedRouteLoading && authed !== true) {
      setErrorHandler();
      return (<Redirect to="/" />);
    }
    return (<Component {...props} />);
  }}
/>
));

function CurrentRoute() {
  return (
    <Switch>
      <Route path={Video.url} component={Video} />
      <PrivateRoute path={Settings.url} component={Settings} />
      <Route path={Movie.url} component={Movie} />
      <Route path={ForgotPassword.url} component={ForgotPassword} />
      <Route path={Register.url} component={Register} />
      <Route exact path={Home.url} component={Home} />
      <Redirect path="*" to={Home.url} />
      <Route component={Home} />
    </Switch>
  );
}

export default CurrentRoute;

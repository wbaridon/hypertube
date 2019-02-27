import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setErrorA } from 'Actions';
import Home from '../home/home';
import Movie from '../movie/movie';
import Settings from '../settings/settings';
import ForgotPassword from '../forgot-password';
import Users from '../users';
import User from '../user';
import Oauth from '../oauth';
import LoadingDots from '../loading-dots';
import Movies from '../movies';
import WatchList from '../watchlist/watchlist';


const mapStateToProps = state => ({
  authed: state.user.tokenValid && state.user.dataFetched,
  profilIsFill: state.user.data.profilIsFill,
  protectedRouteLoading: state.protectedRouteLoading,
  dataFetched: state.user.dataFetched,
});

const mapDispatchToProps = dispatch => ({
  setErrorHandler: routeUrl => dispatch(setErrorA('navigation.error.notAuthed', `: ${routeUrl}`)),
});

const PublicOnlyRoute = connect(mapStateToProps, mapDispatchToProps)(({
  component:
  Component,
  authed,
  protectedRouteLoading,
  setErrorHandler,
  profilIsFill,
  dataFetched,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      if (authed === true) {
        return (<Redirect to="/" />);
      }
      return (<Component {...props} />);
    }}
  />
));

const PrivateRoute = connect(mapStateToProps, mapDispatchToProps)(({
  component:
  Component,
  authed,
  protectedRouteLoading,
  setErrorHandler,
  profilIsFill,
  dataFetched,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      if (protectedRouteLoading) {
        return (<LoadingDots />);
      }
      if (!protectedRouteLoading && authed !== true) {
        return (<Redirect to={{ pathname: '/', state: { from: props.location.pathname } }} />); // eslint-disable-line
      }
      if (!protectedRouteLoading && authed && dataFetched && !profilIsFill && props.location.pathname !== '/settings') {
        return (<Redirect to="/settings" />);
      }
      return (<Component {...props} />);
    }}
  />
));

function CurrentRoute() {
  return (
    <div style={{ marginBottom: 70, marginTop: 15 }}>
      <Switch>
        <PublicOnlyRoute path={Oauth.url} component={Oauth} />
        <PublicOnlyRoute path={ForgotPassword.url} component={ForgotPassword} />
        <PrivateRoute path={Movies.url} component={Movies} />
        <PrivateRoute path={User.url} component={User} />
        <PrivateRoute path={Users.url} component={Users} />
        <PrivateRoute path={Settings.url} component={Settings} />
        <PrivateRoute path={WatchList.url} component={WatchList} />
        <PrivateRoute path={Movie.url} component={Movie} />
        <Route exact path={Home.url} component={Home} />
        <Redirect path="*" to={Home.url} />
        <Route component={Home} />
      </Switch>
    </div>
  );
}

export default CurrentRoute;

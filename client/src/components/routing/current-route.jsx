import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../home/home';
import Register from '../register/register';
import Video from '../video/video';
import Login from '../login/login';

function CurrentRoute() {
  return (
    <Switch>
      <Route path={Video.url} component={Video} />
      <Route path={Login.url} component={Login} />
      <Route path={Register.url} component={Register} />
      <Route exact path={Home.url} component={Home} />
      <Redirect path="*" to={Home.url} />
    </Switch>
  );
}

export default CurrentRoute;

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../home/home';
import Register from '../register/register';
import Video from '../video/video';

function CurrentRoute() {
  return (
    <Switch>
      <Route exact path={Video.url} component={Video} />
      <Route path={Register.url} component={Register} />
      <Route exact path={Home.url} component={Home} />
      <Redirect path="*" to={Home.url} />
      <Route component={Home} />
    </Switch>
  );
}

export default CurrentRoute;

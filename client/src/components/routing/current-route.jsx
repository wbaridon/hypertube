import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../home/home';


function CurrentRoute() {
  return (
    <Switch>
      <Route path={Home.url} component={Home} />
      <Redirect path="*" to={Home.url} />
    </Switch>
  );
}

export default CurrentRoute;

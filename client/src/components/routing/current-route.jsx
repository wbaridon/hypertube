import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../home/home';
import Register from '../register/register';


function CurrentRoute() {
  return (
    <Switch>
      <Route path={Register.url} component={Register} />
      <Route path={Home.url} component={Home} />
      <Redirect path="*" to={Home.url} />
    </Switch>
  );
}

export default CurrentRoute;

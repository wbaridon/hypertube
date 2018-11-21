import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../home/home';
import Register from '../register/register';
import Video from '../video/video';
import Movie from '../movie/movie';

function CurrentRoute() {
  return (
    <Switch>
      <Route exact path={Video.url} component={Video} />
      <Route path={Movie.url} component={Movie} />
      <Route path={Register.url} component={Register} />
      <Route exact path={Home.url} component={Home} />
      <Redirect path="*" to={Home.url} />
      <Route component={Home} />
    </Switch>
  );
}

export default CurrentRoute;

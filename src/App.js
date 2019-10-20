import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom'
import Main from './Main';
import Form from './Form';

export default () => (
  <HashRouter>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route exact path="/form" component={Form} />
    </Switch>
  </HashRouter>
);
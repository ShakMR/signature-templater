import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Main from './Main';
import Form from './Form';

export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route exact path="/form" component={Form} />
    </Switch>
  </BrowserRouter>
);

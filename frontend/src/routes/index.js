import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';

import Deliveries from '../pages/Deliveries';
import Deliverymen from '~/pages/Deliverymen';
import Recipients from '~/pages/Recipients';
import Problems from '~/pages/Problems';

import Deliveryman from '~/pages/Deliveryman';
import Recipient from '~/pages/Recipient';

export default function Routes() {
  return (
    <Switch>
      {/* Rotas sem autenticacao */}
      <Route path="/" exact component={SignIn} />

      {/* Rotas sem autenticacao */}
      {/* Rotas principais */}
      <Route path="/deliveries" component={Deliveries} isPrivate />
      <Route path="/deliverymen" component={Deliverymen} isPrivate />
      <Route path="/recipients" component={Recipients} isPrivate />
      <Route path="/problems" component={Problems} isPrivate />

      {/* Sub Rotas */}
      <Route path="/new/deliveryman" component={Deliveryman} isPrivate />
      <Route path="/edit/deliveryman/:id" component={Deliveryman} isPrivate />

      <Route path="/new/recipient" component={Recipient} isPrivate />
      <Route path="/edit/recipient/:id" component={Recipient} isPrivate />
    </Switch>
  );
}

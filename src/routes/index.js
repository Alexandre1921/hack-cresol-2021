import React from 'react';
import { Switch, Redirect } from "react-router-dom";

import Route from './Route';

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import PublicLayout from 'layouts/Public.js';

const Routes = () => {
  return (
    <Switch>
      <Route path="/admin" component={(props) =><AdminLayout {...props} />} isPrivate/>
      <Route path="/public" component={(props) => <PublicLayout {...props} />} />
      <Route path="/" component={(props) => <AuthLayout {...props} />} />
      <Route render={() => <Redirect to={{pathname: "/"}} />} />
    </Switch>
  );
};

export default Routes;
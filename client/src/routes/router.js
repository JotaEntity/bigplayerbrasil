import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "../pages/auth/login";
import Dashboard from "../pages/dashboard/dashboard";
import ResultAccount from "../pages/result/result";
import Selective from "../pages/selective/selective";
import { Auth, userIsAdmin } from "../providers/auth";
export default function routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/"
          exact={true}
          component={userIsAdmin() == true ? Dashboard : ResultAccount}
        />
        <Route path="/selective" exact={true} component={Selective} />
      </Switch>
    </BrowserRouter>
  );
}

import React from "react";
import { Switch, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import ProtectedRoute from "./components/ProtectedRoute";

import Layout from "./pages/Layout";
import Login from "./pages/Login";

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Switch>
        <Route path={"/login"}>
          <Login />
        </Route>
        <ProtectedRoute path="/">
          <Layout />
        </ProtectedRoute>
      </Switch>
    </React.Fragment>
  );
}

export default App;

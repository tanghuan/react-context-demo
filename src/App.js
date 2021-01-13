import React from "react";
import { Switch, Route } from "react-router-dom";
import Index from "./pages/Index";
import PageOne from "./pages/PageOne";
import PageTwo from "./pages/PageTwo";

function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <Index />
      </Route>
      <Route path={"/page_one"}>
        <PageOne />
      </Route>
      <Route path={"/page_two"}>
        <PageTwo />
      </Route>
    </Switch>
  );
}

export default App;

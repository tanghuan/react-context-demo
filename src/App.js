import React from "react";
import { Switch, Route } from "react-router-dom";
import Index from "./pages/Index";
import PageOne from "./pages/PageOne";
import PageTwo from "./pages/PageTwo";
import WebsocketDemo from "./pages/WebsocketDemo";

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
      <Route path={"/websocket_demo"}>
        <WebsocketDemo />
      </Route>
    </Switch>
  );
}

export default App;

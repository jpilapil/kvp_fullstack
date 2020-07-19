import React from "react";
import "./style/master.scss"; // global styles
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./components/pages/Landing";
import Connect from "./components/pages/Connect";
import Profile from "./components/pages/Profile";
import NotFound from "./components/pages/NotFound";
// import testlogin from "./components/pages/testlogin";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/connect" component={Connect} />
        <Route exact path="/profile" component={Profile} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;

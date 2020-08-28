import React from "react";
import "./style/master.scss"; // global styles
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./components/pages/Landing";
import Connect from "./components/pages/Connect";
import Profile from "./components/pages/Profile";
import NotFound from "./components/pages/NotFound";
// import jwtDecode from "jwt-decode";
// import store from "./store/store";
// import actions from "./store/actions";

// const authToken = localStorage.authToken;
// if (authToken) {
//   // if authToken is not expired
//   const currentTimeInSec = Date.now() / 1000;
//   const user = jwtDecode(authToken);
//   if (currentTimeInSec > user.exp) {
//     console.log("Expired token.");
//     // remove currentUser from redux store
//     store.dispatch({
//       type: actions.UPDATE_CURRENT_USER,
//       payload: {},
//     });
//   } else {
//     console.log("Valid token.");
//     // store user in global state / redux store
//     store.dispatch({
//       type: actions.UPDATE_CURRENT_USER,
//       payload: user,
//     });
//     // set authorization headers
//     // redirect to connect page
//     const currentUrl = window.location.pathname;
//     if (currentUrl === "/") {
//       window.location.href = "/connect";
//     }
//   }
// } else {
//   console.log("Invalid token.");
// }

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

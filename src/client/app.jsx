import { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import styles from "./app.module.css";
import Complete from "./pages/accounts/complete/complete";
import Login from "./pages/accounts/login/login";
import Signup from "./pages/accounts/signup/signup";
import Home from "./pages/home/home";
import NotFound from "./pages/not_found/not_found";

const App = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/account/login">
        <Login />
      </Route>
      <Route exact path="/account/signup">
        <Signup />
      </Route>
      <Route exact path="/account/complete">
        <Complete />
      </Route>
      <Route exact path="/not-found">
        <NotFound />
      </Route>
    </Switch>
  );
};

export default App;

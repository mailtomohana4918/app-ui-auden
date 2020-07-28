import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import SearchLibrary from "./components/SearchLibrary/SearchLibrary";
import IssueLibrary from "./components/IssueLibrary/IssueLibrary";

const AppRoutes = (props) => (
  <Router>
    <Switch>
      <Route
        exact
        path="/issue/search/:id"
        render={(routeProps) => (
          <IssueLibrary {...routeProps}  />
        )}
      />

      <Route path="/">
        <SearchLibrary />
      </Route>
    </Switch>
  </Router>
);

export default AppRoutes;

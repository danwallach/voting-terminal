import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, hashHistory, IndexRoute } from "react-router";
import App from "./App";
import ResearcherPicker from "./ResearcherPicker.jsx";
import "./index.css";

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={ResearcherPicker} />
    </Route>
  </Router>,
  document.getElementById("root")
);

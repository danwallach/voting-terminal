import "../node_modules/roboto-fontface/css/roboto/roboto-fontface.css";
import "../node_modules/material-design-icons/iconfont/material-icons.css";
import "./material.css";
import "./material.js";
import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, hashHistory, IndexRoute } from "react-router";
import App from "./App";
import ResearcherPicker from "./ResearcherPicker";
import SanFranciscoDesign from "./SanFranciscoDesign";
import ClaudiaZieglerAcemyanDesign from "./ClaudiaZieglerAcemyanDesign";
import "./index.css";

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={ResearcherPicker} />
      <Route path="/sf" component={SanFranciscoDesign} />
      <Route path="/claudia" component={ClaudiaZieglerAcemyanDesign} />
    </Route>
  </Router>,
  document.getElementById("root")
);

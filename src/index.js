import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, hashHistory, IndexRoute } from "react-router";
import * as firebase from "firebase";

import App from "./App";
import ResearcherPicker from "./ResearcherPicker";
import SanFranciscoDesign from "./SanFranciscoDesign";
import ClaudiaZieglerAcemyanDesign from "./ClaudiaZieglerAcemyanDesign";
import PhilipKortumDesign from "./PhilipKortumDesign";
import StartPage from "./StartPage";
import FinalPage from "./FinalPage";

import "../node_modules/roboto-fontface/css/roboto/roboto-fontface.css";
import "../node_modules/material-design-icons/iconfont/material-icons.css";
import "../node_modules/material-components-web/dist/material-components-web.min.css";
import "./material.css";
import "./material.js";
import "./index.css";

var config = {
  apiKey: "AIzaSyBLBU3wBuHy2UE1JwTjhSggdoBZ5uRJaoo",
  authDomain: "voting-terminal.firebaseapp.com",
  databaseURL: "https://voting-terminal.firebaseio.com",
  storageBucket: "voting-terminal.appspot.com",
  messagingSenderId: "890479886827"
};
firebase.initializeApp(config);

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={ResearcherPicker} />
      <Route path="/sf" component={SanFranciscoDesign} />
      <Route path="/claudia" component={ClaudiaZieglerAcemyanDesign} />
      <Route path="/phil" component={PhilipKortumDesign} />
      <Route path="/finalpage" component={FinalPage} />
      <Route path="/startpage" component={StartPage} />
    </Route>
  </Router>,
  document.getElementById("root")
);

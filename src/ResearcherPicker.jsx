import React from "react";
import "../node_modules/roboto-fontface/css/roboto/roboto-fontface.css";
import "../node_modules/material-design-icons/iconfont/material-icons.css"
import "./material.css";
import "./material.js";

export default function ResearcherPicker() {
  return (
    <ul className="mdl-list">
      <li className="mdl-list__item">
        <span className="mdl-list__item-primary-content">
          <i className="material-icons mdl-list__item-avatar">person</i>
          <span>San Francisco</span>
        </span>
      </li>
      <li className="mdl-list__item">
        <span className="mdl-list__item-primary-content">
          <i className="material-icons mdl-list__item-avatar">person</i>
          <span>Claudia Ziegler Acemyan</span>
        </span>
      </li>
      <li className="mdl-list__item">
        <span className="mdl-list__item-primary-content">
          <i className="material-icons mdl-list__item-avatar">person</i>
          <span>Philip Kortum</span>
        </span>
      </li>
    </ul>
  );
}

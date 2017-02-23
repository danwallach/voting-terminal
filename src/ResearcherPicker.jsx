import React from "react";
import "../node_modules/roboto-fontface/css/roboto/roboto-fontface.css";
import "../node_modules/material-design-icons/iconfont/material-icons.css";
import "./material.css";
import "./material.js";
import researchers from "./researchers.json";

export default function ResearcherPicker() {
  const body = researchers.reduce(
    (rows, researcher) => rows.concat(
      <a href="#">
        <div className="mdl-list__item mdl-card__actions mdl-card--border">
          <span className="mdl-list__item-primary-content">
            <i
              style={{
                backgroundImage: "url(" + researcher.avatarUrl + ")",
                backgroundSize: "auto 40px"
              }}
              className="material-icons mdl-list__item-avatar"
            />
            <span>{researcher.name}</span>
          </span>
        </div>
      </a>
    ),
    []
  );
  console.log(body);
  return (
    <div className="mdl-card mdl-shadow--2dp">
      <div className="mdl-card__title">
        <h2 className="mdl-card__title-text">Choose a researcher</h2>
      </div>
      {body}
    </div>
  );
}

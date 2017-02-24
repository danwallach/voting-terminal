import React from "react";
import { Link } from "react-router";
import researchers from "./researchers.json";

export default function ResearcherPicker() {
  const body = researchers.reduce(
    (rows, researcher) => rows.concat(
      <Link to={researcher.route}>
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
      </Link>
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

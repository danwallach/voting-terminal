import React from "react";
import "../node_modules/roboto-fontface/css/roboto/roboto-fontface.css";
import "../node_modules/material-design-icons/iconfont/material-icons.css";
import "./material.css";
import "./material.js";

export default class Candidate extends React.Component {
  //Creates a candidate. Contains a checkbox and a candidate title
  //Contains the proporties onClick and checked
  //checked tells the candidate whether its box should be checked
  //onClick passes a click event up to candidateTable with no parameters
  //						checked={this.props.this_candidate_checked}
  render() {
    return (
      <tr>
        <td className="mdl-data-table__cel--non-numeric">
          <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect">
            <input
              id={this.props.tableNo + this.props.name}
              type="checkbox"
              className="mdl-checkbox__input"
              onClick={() => this.props.onClick()}
            />
            <span className="mdl-checkbox__label">
              <p
                className="mdl-typography--body-1 mdl-typography--text-capitalize mdl-typography--text-left"
              >
                {this.props.name}
              </p>
              <p
                className="mdl-typography--caption  mdl-typography--text-capitalize mdl-typography--text-right"
              >
                {this.props.party}
              </p>
            </span>
          </label>
        </td>
      </tr>
    );
  }
}

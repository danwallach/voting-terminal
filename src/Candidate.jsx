import React from "react";

import Checkbox from "./components/Checkbox";
import CheckboxLabel from "./components/CheckboxLabel";
import FormField from "./components/FormField";

import "./Candidate.css";

const defaultProps = {
  checked: false,
  disabled: false,
  bold: false
};

class Candidate extends React.Component {
  //Creates a candidate. Contains a checkbox and a candidate title
  //Contains the proporties onClick and checked
  //checked tells the candidate whether its box should be checked
  //onClick passes a click event up to candidateTable with no parameters
  render() {
    const { candidate, index, checked, disabled, bold } = this.props;
    return (
      <tr>
        <td className="mdl-data-table__cell--non-numeric">
          <FormField style={{ width: "100%" }}>
            <Checkbox
              id={`${index} ${candidate.name}`}
              onChange={() => this.props.onClick()}
              checked={checked}
              disabled={disabled}
            />
            <CheckboxLabel for={`${index} ${candidate.name}`}>
              <p
                className="mdc-typography--title"
                style={bold ? { fontWeight: 700 } : { fontWeight: 400 }}
              >
                {candidate.name}
              </p>
              <p className={`mdc-typography--body${bold ? "2" : "1"}`}>
                {candidate.term}
                <span style={{ float: "right" }}>
                  {candidate.party}
                </span>
              </p>
            </CheckboxLabel>
          </FormField>
        </td>
      </tr>
    );
  }
}

Candidate.defaultProps = defaultProps;

export default Candidate;

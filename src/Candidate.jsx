import React from "react";

import Checkbox from './components/Checkbox';
import CheckboxLabel from './components/CheckboxLabel';
import FormField from './components/FormField';

import './Candidate.css'

export default class Candidate extends React.Component {
  //Creates a candidate. Contains a checkbox and a candidate title
  //Contains the proporties onClick and checked
  //checked tells the candidate whether its box should be checked
  //onClick passes a click event up to candidateTable with no parameters
  //						checked={this.props.this_candidate_checked}
  render() {
    return (
      <tr>
        <td className="mdl-data-table__cell--non-numeric">
          <FormField style={{width: "100%"}}>
            <Checkbox
              id={this.props.tableNo + this.props.candidate.name}
              onChange={() => this.props.onClick()}
              checked={this.props.checked}
            />
            <CheckboxLabel for={this.props.tableNo + this.props.candidate.name}>
              <p className="mdl-typography--body-1 mdl-typography--text-left">
                {this.props.candidate.name}
              </p>
              <p className="mdl-typography--caption mdl-typography--text-left">
                {this.props.candidate.term}
                <span
                  style={{ float: "right" }}
                  className="mdl-typography--caption"
                >
                  {this.props.candidate.party}
                </span>
              </p>
            </CheckboxLabel>
          </FormField>
        </td>
      </tr>
    );
  }
}

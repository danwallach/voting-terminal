import React from "react";
import Candidate from "./Candidate";
import "./Office.css";

export default class CandidateTable extends React.Component {
  /*Creates a table with a header and a few Candidate objects
   *Contains the properties onClick, this_table_check_values, and candidates
   *when onClick is called by child candidate, the function is sent up to Office
   *the function is sent with parameters indicating which table was clicked, and the index within that table
   *this_table_check_values has the check values for each table,
   *This is sent down to each candidate
   *The candidates names are also sent down to each candidate
   */
  renderCandidate(candidate, index) {
    //Creation of a candidate, sending down properties
    return (
      <Candidate
        candidate={candidate}
        key={index}
        tableNo={this.props.choiceNo - 1}
        onClick={() => this.props.onClick(this.props.choiceNo - 1, index)}
      />
    );
  }
  render() {
    //Creating the head of the table
    const toOrdinal = {
      1: "First",
      2: "Second",
      3: "Third"
    };
    const instructions = {
      1: "Vote for One",
      2: "Vote for One: Must be different than your first choice",
      3: "Vote for One: Must be different than your first and second choices"
    };
    const head = (
      <tr>
        <th>
          <p className="mdl-typography--display-1 mdl-typography--text-left">
            {this.props.choiceNo}
            <span style={{paddingLeft: "1ex"}} className="mdl-typography--title">{toOrdinal[this.props.choiceNo] + " Choice"}</span>
          </p>
          <p className="mdl-typography--body-1 mdl-typography--text-left">
            {instructions[this.props.choiceNo]}
          </p>
        </th>
      </tr>
    );
    //Creates an array of candidates, calls renderCandidate function
    var rows = [];
    this.props.candidates.forEach((candidate, index) => {
      rows.push(this.renderCandidate(candidate, index));
    });
    //Returns an HTML table with the header and candidate array
    return (
      <table
        style={{ float: "left" }}
        className="mdl-data-table mdl-js-data-table mdl-shadow--2dp mdl-cell mdl-cell--8-col-tablet"
      >
        <thead>
          {head}
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
}


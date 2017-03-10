import React from "react";
import Candidate from "./Candidate";
import "./CandidateTable.css";

const defaultProps = {
  disabled: false,
  inFocus: false,
  previousChoices: [],
  boldSelectedCandidate: false,
  hidePreviouslySelectedCheckboxes: false
};

class CandidateTable extends React.Component {
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
    const {
      choiceNo,
      choice,
      previousChoices,
      boldSelectedCandidate,
      hidePreviouslySelectedCheckboxes
    } = this.props;
    return (
      <Candidate
        candidate={candidate}
        key={index}
        index={choiceNo - 1}
        onClick={() => this.props.onClick(choiceNo - 1, index)}
        checked={choice === candidate.name ? true : false}
        disabled={previousChoices.some(choice => choice === candidate.name)}
        bold={boldSelectedCandidate && choice === candidate.name ? true : false}
        hiddenCheckbox={
          hidePreviouslySelectedCheckboxes &&
            previousChoices.some(choice => choice === candidate.name)
            ? true
            : false
        }
      />
    );
  }
  render() {
    const { disabled, inFocus } = this.props;
    //Creating the head of the table
    const toOrdinal = {
      1: "First",
      2: "Second",
      3: "Third"
    };
    const instructions = {
      1: [
        "Vote for One",
        (
          <span style={{ visibility: "hidden" }}>
            : Must be different than your first and second choices
          </span>
        )
      ],
      2: [
        "Vote for One: Must be different than your first choice",
        <span style={{ visibility: "hidden" }}>and second s</span>
      ],
      3: "Vote for One: Must be different than your first and second choices"
    };
    const head = (
      <tr>
        <th>
          <p className="mdc-typography--display3" style={{ textAlign: "left" }}>
            {this.props.choiceNo}
            <span
              style={{ paddingLeft: "1ex" }}
              className="mdc-typography--display1"
            >
              {`${toOrdinal[this.props.choiceNo]} Choice`}
            </span>
          </p>
          <p
            className="mdc-typography--subheading2"
            style={{ textAlign: "left" }}
          >
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
      <div
        className={
          `mdc-layout-grid__cell mdc-layout-grid__cell--span-${this.props.size} mdc-layout-grid__cell--span-8-tablet mdc-layout-grid__cell--span-4-phone ${disabled &&
            "disabled"}`
        }
      >
        <table
          className={
            `mdl-data-table mdl-js-data-table mdc-elevation-transition mdc-elevation--z${inFocus
              ? 12
              : 2}`
          }
          style={{ width: "100%" }}
        >
          <thead>
            {head}
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
}

CandidateTable.defaultProps = defaultProps;

export default CandidateTable;

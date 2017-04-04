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
    /**
     * Creates one candidate table
     * For each Researcher's UI, there are three tables generated
     * The properties and choices made in "previous" tables affect later ones
     * The Researcher parent passes down many properties to the tables they create
     */
  renderCandidate(candidate, index) {
    /**
     * This function creates a candidate object to be added to the candidate table
     * Many properties are passed down to the candidate
     * candidate is the name of the candidate
     * key is the index within the table (the third candidate is key #2, etc)
     * index is the number of the table (each voting UI only has three tables, so index can be 0,1, or 2)
     * onClick is interesting. It passes down the onClick function
     * Whenever the child calls the onClick function, it instead does the function that was passed down to it
     * In this case, the candidate child calls onclick, which calls candidatetables onClick
     * Both Candidate and CandidateTable have the onClick function stored within their props
     * CandidateTable's onClick is itself passed from the Researcher that created the table
     * so Candidate calls Candidate Table, which calls the onClick within the researcher
     * checked determines whether the candidate's checkbox should be checked
     * this uses the variable "choice", which is the name of the chosen candidate, passed down from the Researcher
     * disabled uses a lambda function to see if the choice for this table was one of the choices for any of the earlier tables
     * If so, the checkbox should be disabled
     * bold determines whether the candidate name should be bolded
     * This depends on the researcher, and is only if that candidate is the current choice
     * hiddenCheckbox determines if the checkbox next to the Candidate should be hidden
     * hiddenCheckbox also depends on the researcher, and also is only hidden if the choice for this table matches choices from a previous table
     */
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
        <span style={{ visibility: "hidden" }}>
          : Must be different than your first and second choices
        </span>
      ],
      2: [
        "Vote for One: Must be different than your first choice",
        <span style={{ visibility: "hidden" }}>and second s</span>
      ],
      3: "Vote for One: Must be different than your first and second choices"
    };
      //this.props.choiceNo is the index of the table
    const head = (
      <tr>
        <th>
          <p className="mdc-typography--display2" style={{ textAlign: "left" }}>
            {this.props.choiceNo}
            <span
              style={{ paddingLeft: "1ex" }}
              className="mdc-typography--headline"
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
    //Creates an array with all of the candidates
    var rows = [];
    this.props.candidates.forEach((candidate, index) => {
      rows.push(this.renderCandidate(candidate, index));
    });
    //Returns an HTML table with the header and candidate array
    return (
      <div
        className={
          `mdc-layout-grid__cell mdc-layout-grid__cell--span-${this.props.size} mdc-layout-grid__cell--span-8-tablet mdc-layout-grid__cell--span-4-phone ${disabled && "disabled"}`
        }
      >
        <table
          className={
            `mdl-data-table mdl-js-data-table mdc-elevation--z2 ${inFocus && "in-focus"}`
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

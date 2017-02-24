import React, { Component } from "react";
//import "../node_modules/roboto-fontface/css/roboto/roboto-fontface.css";
//import "../node_modules/material-design-icons/";
//import "./material.css";
//import "./material.js";
import "./Office.css";
import election from "./election.json";

class Candidate extends React.Component {
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

class CandidateTable extends React.Component {
  /*Creates a table with a header and a few Candidate objects
   *Contains the properties onClick, this_table_check_values, and candidates
   *when onClick is called by child candidate, the function is sent up to Office
   *the function is sent with parameters indicating which table was clicked, and the index within that table
   *this_table_check_values has the check values for each table,
   *This is sent down to each candidate
   *The candidates names are also sent down to each candidate
   */
  renderCandidate(name, party, index) {
    //Creation of a candidate, sending down properties
    return (
      <Candidate
        name={name}
        party={party}
        key={index}
        tableNo={this.props.choiceNo - 1}
        onClick={() => this.props.onClick(this.props.choiceNo - 1, index)}
      />
    );
  }
  render() {
    //Creating the head of the table
    var head;
    head = (
      <tr>
        <th>
          <p className="mdl-typography--body-2 mdl-typography--text-left">
            Choice #{this.props.choiceNo}
          </p>
          <p className="mdl-typography--body-1 mdl-typography--text-left">
            Choose a candidate. Choice may not be same as previous choice
          </p>
        </th>
      </tr>
    );
    //Creates an array of candidates, calls renderCandidate function
    var rows = [];
    this.props.candidates.forEach((candidate, index) => {
      rows.push(this.renderCandidate(candidate.name, candidate.party, index));
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

class Office extends React.Component {
  //Office is the logic layer that contains and distributes most of the information
  constructor(props) {
    super(props);
    this.state = {
      final_choices: [null, null, null]
    };
  }
  //creates one candidate table
  renderCandidateTable(index) {
    return (
      <CandidateTable
        onClick={(t, i) => this.handleClick(t, i)}
        candidates={this.props.candidates}
        choiceNo={index + 1}
        key={index}
      />
    );
  }
  render() {
    //Creates an array of three candidate tables
    var tables = [];
    for (let i = 0; i < 3; i++) {
      tables.push(this.renderCandidateTable(i));
    }
    //Creation of three (San Fran allows 3) candidate tables
    //Certain properties are passed down, see CandidateTable for more info
    return (
      <div className="mdl-cell mdl-cell--12-col">
        <h2
          className="mdl-typography--title mdl-typography--text-center mdl-typography--text-capitalize"
        >
          {this.props.office}
        </h2>
        <p className="mdl-typography--body-1 mdl-typography--text-center">
          Vote your first, second, and third choices
        </p>
        <div>
          {tables}
        </div>
      </div>
    );
  }
  //Whenever a candidate detects a click, it sends that fact to CandidateTable
  //CandidateTable sends that up to Office with the table_index and index
  //handleClick will then change the state of the checkboxvalues array
  //All boxes in the row and column of the focused box will be set to 0
  //The focused box itself will be toggled
  handleClick(table_index, index) {
    var cand_name = this.props.candidates[index].name;
    var choices_temp = this.state.final_choices.slice();
    choices_temp[table_index] = cand_name;
    for (let i = 0; i < 3; i++) {
      if (i !== table_index && choices_temp[i] === choices_temp[table_index]) {
        choices_temp[i] = null;
      }
    }
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < this.props.candidates.length; j++) {
        if (i === table_index ^ j === index) {
          document.getElementById(
            String(i) + this.props.candidates[j].name
          ).checked = false;
        }
      }
    }
    this.setState({
      final_choices: choices_temp
    });
  }
  //This function listens for an update and then searches through the document for all checkboxes
  //Each checkboxe is then updated
  componentDidUpdate() {
    document
      .querySelectorAll(".mdl-js-checkbox")
      .forEach(element => element.MaterialCheckbox.checkToggleState());
  }
}

class Contest extends Component {
  render() {
    return (
      <Office
        office={this.props.contest.office}
        candidates={this.props.contest.candidates}
      />
    );
  }
}

class Election extends Component {
  render() {
    return <Contest contest={election.contests[0]} />;
  }
}

export default class SanFranciscoDesign extends Component {
  render() {
    return (
      <div className="mdl-grid">
        <Election />
      </div>
    );
  }
}

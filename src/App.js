import React, { Component } from "react";
import "../node_modules/roboto-fontface/css/roboto/roboto-fontface.css";
import "../node_modules/material-design-icons/";
import "./material.css";
import "./material.js";
import "./App.css";
import election from "./election.json";
/* Welcome to the voting terminal San Francisco Style code
 * This code is based off of React, a javascript framework
 * React philosophy indicates that javascript, html, and JSX should all be in the same file
 * This code is split into multiple layers, each its own class
 * Candidate is the bottom layer, composed of a checkbox and candidate name
 * Candidate Table is the next layer, a table of... Candidates
 * Office is the highest important layer, it has 3 Candidate Tables
 * The next two layers are Level of Government and App, but you don't have to worry about those
 *
 * Each layer passes up and down certain values
 * Lets start at the top important layer, Office
 * Office is constructed with an array called checkboxvalues which contains information
 * about each checkbox and its supposed value
 * Whenever a box is checked, every box in its row and column must be unchecked
 * This logic is done in handleClick
 * the Office layer sends down an array of check values to each table
 * it also sends down an onClick function and an array of candidate names
 * The table layer doesn't do much, it creates Candidates based on the cand names
 * It passes a checked value to each candidate, an onclick function, and a cand name
 *
 * The Candidate renders based on its checked value and cand name
 * Whenever it is clicked, it does nothing.
 * Instead, it sends up the onClick function to table, which immediately sends
 * the onClick funtion up to Office's handleClick function<Plug>(neosnippet_expand)
 * The funtion is sent up with parameters indicating the position of the box clicked
 * The checkboxvalues state array is changed in Office,
 * and the candidates are re-rendered based on the new state
 * A helper function called componentDidUpdate listens for a rerender and
 * unchecks or checks the various checkboxes based on the values from the array
 */

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
    if (this.props.choiceNo !== 1) {
      rows.push(
        <button
          className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect"
          onClick={() => this.props.onPrevious()}
        >
          Previous
        </button>
      );
    }
    if (this.props.choiceNo !== 3) {
      rows.push(
        <button
          className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect"
          onClick={() => this.props.onNext()}
        >
          Next
        </button>
      );
    }
    var style;
    if (this.props.valid) {
      style = {
        float: "center"
      };
    } else {
      style = {
        display: "none"
      };
    }
    //Returns an HTML table with the header and candidate array
    return (
      <table
        style={style}
        className="mdl-data-table mdl-js-data-table mdl-shadow--2dp mdl-cell--8-col mdl-cell--8-col-tablet"
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
      final_choices: [null, null, null],
      table_valids: [1, 0, 0]
    };
  }
  //creates one candidate table
  renderCandidateTable(index) {
    return (
      <CandidateTable
        onClick={(t, i) => this.handleClick(t, i)}
        onNext={() => this.handleNext(index)}
        onPrevious={() => this.handlePrevious(index)}
        candidates={this.props.candidates}
        choiceNo={index + 1}
        valid={this.state.table_valids[index]}
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
  handleNext(index) {
    if (this.state.final_choices[index]) {
      var valid_temp = this.state.table_valids.slice();
      valid_temp[index] = 0;
      valid_temp[index + 1] = 1;
      this.setState({
        table_valids: valid_temp
      });
    }
  }
  handlePrevious(index) {
    var valid_temp = this.state.table_valids.slice();
    valid_temp[index] = 0;
    valid_temp[index - 1] = 1;
    this.setState({
      table_valids: valid_temp
    });
  }
  handleClick(table_index, index) {
    var cand_name = this.props.candidates[index].name;
    var choices_temp = this.state.final_choices.slice();
		if(choices_temp[table_index]===cand_name){
			choices_temp[table_index]=null;
		}
		else{
			choices_temp[table_index]=cand_name;
		}
    for (let i = 0; i < 3; i++) {
      if (i!==table_index && choices_temp[i] === choices_temp[table_index]) {
        choices_temp[i] = null;
      }
    }
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < this.props.candidates.length; j++) {
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
		console.log(this.state.final_choices);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < this.props.candidates.length; j++) {
        document.getElementById(
          String(i) + this.props.candidates[j].name
        ).disabled = false;
      }
    }
    for (let j = 0; j < this.props.candidates.length; j++) {
      if (this.props.candidates[j].name === this.state.final_choices[0]) {
        document.getElementById(
          "1" + this.props.candidates[j].name
        ).disabled = true;
        document.getElementById(
          "2" + this.props.candidates[j].name
        ).disabled = true;
      }
      if (this.props.candidates[j].name === this.state.final_choices[1]) {
        document.getElementById(
          "2" + this.props.candidates[j].name
        ).disabled = true;
      }
    }
    document
      .querySelectorAll(".mdl-js-checkbox")
      .forEach(element => element.MaterialCheckbox.checkToggleState());
    document
      .querySelectorAll(".mdl-js-checkbox")
      .forEach(element => element.MaterialCheckbox.checkDisabled());
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

class App extends Component {
  render() {
    return (
      <div className="mdl-grid">
        <Election />
      </div>
    );
  }
}

export default App;

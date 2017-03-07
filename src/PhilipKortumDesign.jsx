import React, { Component } from "react";
import CandidateTable from "./CandidateTable";
import election from "./election.json";

class Office extends React.Component {
  //Office is the logic layer that contains and distributes most of the information
  constructor(props) {
    super(props);
    var timings_temp = []
    timings_temp.push(["Begin",new Date().getTime()]);
    this.state = {
      timings: timings_temp,
      final_choices: [null, null, null],
      table_valids: [1, 0, 0]
    };
  }
  //creates one candidate table
  renderCandidateTable(index) {
    return (
      <div style={this.state.table_valids[index] ? {} : {display: "none"}}>
        <div className="mdl-grid">
          <CandidateTable
            onClick={(t, i) => this.handleClick(t, i)}
            onNext={() => this.handleNext(index)}
            onPrevious={() => this.handlePrevious(index)}
            candidates={this.props.candidates}
            choiceNo={index + 1}
            valid={this.state.table_valids[index]}
            key={index}
            size={12}
          />
        </div>
        <div>
          <button
            className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect"
            onClick={() => this.handlePrevious(index)}
            style={index !== 0 ? {visibility: "visible"} : {visibility: "hidden"}}
          >
            Previous
          </button>
          <button
            className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect"
            onClick={() => this.handleNext(index)}
            style={Object.assign({}, {float: "right"}, index !== 2 ? {visibility: "visible"} : {visibility: "hidden"})}
          >
            Next
          </button>
        </div>
      </div>
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
      <div>
        <h2
          className="mdl-typography--title mdl-typography--text-center mdl-typography--text-capitalize"
        >
          {this.props.office}
        </h2>
        <p className="mdl-typography--body-1 mdl-typography--text-center">
          Vote your first, second, and third choices
        </p>
          {tables}
      </div>
    );
  }
  //Whenever a candidate detects a click, it sends that fact to CandidateTable
  //CandidateTable sends that up to Office with the table_index and index
  //handleClick will then change the state of the checkboxvalues array
  //All boxes in the row and column of the focused box will be set to 0
  //The focused box itself will be toggled
  handleNext(index) {
    var date = new Date();
    var timings_temp = this.state.timings.slice();
    timings_temp.push(["Next",date.getTime()]);
    if (this.state.final_choices[index]) {
      var valid_temp = this.state.table_valids.slice();
      valid_temp[index] = 0;
      valid_temp[index + 1] = 1;
      this.setState({
        timings: timings_temp,
        table_valids: valid_temp
      });
    }
  }
  handlePrevious(index) {
    var date = new Date();
    var timings_temp = this.state.timings.slice();
    timings_temp.push(["Previous",date.getTime()]);
    var valid_temp = this.state.table_valids.slice();
    valid_temp[index] = 0;
    valid_temp[index - 1] = 1;
    this.setState({
      table_valids: valid_temp,
      timings: timings_temp,
    });
  }
  handleClick(table_index, index) {
    var date = new Date();
    var timings_temp = this.state.timings.slice();
    timings_temp.push([table_index,index,date.getTime()]);
    var cand_name = this.props.candidates[index].name;
    var choices_temp = this.state.final_choices.slice();
    if (choices_temp[table_index] === cand_name) {
      choices_temp[table_index] = null;
    } else {
      choices_temp[table_index] = cand_name;
    }
    for (let i = 0; i < 3; i++) {
      if (i !== table_index && choices_temp[i] === choices_temp[table_index]) {
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
      final_choices: choices_temp,
      timings: timings_temp,
    });
  }
  //This function listens for an update and then searches through the document for all checkboxes
  //Each checkboxe is then updated
  componentDidUpdate() {
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

export default class PhilipKortumDesign extends Component {
  render() {
    return (
        <Election />
    );
  }
}

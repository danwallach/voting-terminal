import React, { Component } from "react";
import CandidateTable from "./CandidateTable";
import election from "./election.json";

class Office extends React.Component {
  //Office is the logic layer that contains and distributes most of the information
  constructor(props) {
    super(props);
    this.state = {
      choices: [null, null, null]
    };
  }
  //creates one candidate table
  renderCandidateTable(index) {
    return (
      <CandidateTable
        onClick={(t, i) => this.handleClick(t, i)}
        candidates={this.props.candidates}
        choiceNo={index + 1}
        choice={this.state.choices[index]}
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
      <div>
        <h2 className="mdl-typography--title mdl-typography--text-center">
          {this.props.office}
        </h2>
        <p className="mdl-typography--body-1 mdl-typography--text-center">
          Vote for your first, second, and third choices
        </p>
        <div className="mdl-grid">
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
    var choices_temp = this.state.choices.slice();
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
      choices: choices_temp
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
    return <Election />;
  }
}

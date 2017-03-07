import React, { Component } from "react";
import CandidateTable from "./CandidateTable";
import election from "./election.json";

class ArrowButton extends React.Component {
  render() {
    var disabled = true;
    var title = "Next";
    var tb_vld = this.props.table_valids;
    var tb_vld_num;
    var next_or_previous = 0;
    for (let i = 0; i < tb_vld.length; i++) {
      if (tb_vld[i]) {
        tb_vld_num = i;
      }
    }
    var dex = this.props.buttonNo;
    var fnl_chc = this.props.final_choices;
    var valid;
    if (tb_vld_num - dex > 0) {
      title = "Previous";
      next_or_previous = 1;
    }
    if (next_or_previous) {
      valid = tb_vld[dex] || tb_vld[dex + 1];
    } else {
      valid = (tb_vld[dex] || tb_vld[dex + 1]) && fnl_chc[dex];
    }
    disabled = !valid;
    return (
      <div
        className="mdl-cell mdl-cell--1-col"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <button
          id={this.props.buttonNo + "button"}
          className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect"
          onClick={() =>
            this.props.onClick(this.props.buttonNo, next_or_previous)}
          disabled={disabled}
        >
          {title}
        </button>
      </div>
    );
  }
}

class Office extends React.Component {
  //Office is the logic layer that contains and distributes most of the information
  constructor(props) {
    var timings_temp = [];
    timings_temp.push(["Begin", new Date().getTime()]);
    super(props);
    this.state = {
      timings: timings_temp,
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
        final_choices={this.state.final_choices}
        valid={this.state.table_valids[index]}
        key={index}
        size={3}
      />
    );
  }
  render() {
    //Creates an array of three candidate tables
    var tables = [];
    for (let i = 0; i < 3; i++) {
      tables.push(this.renderCandidateTable(i));
    }
    tables.splice(
      1,
      0,
      <ArrowButton
        buttonNo={0}
        final_choices={this.state.final_choices}
        table_valids={this.state.table_valids}
        onClick={(i, n) => this.handleButton(i, n)}
      />
    );
    tables.splice(
      3,
      0,
      <ArrowButton
        buttonNo={1}
        final_choices={this.state.final_choices}
        table_valids={this.state.table_valids}
        onClick={(i, n) => this.handleButton(i, n)}
      />
    );
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
        <div className="mdl-grid">
          {tables}
        </div>
      </div>
    );
  }
  handleButton(i, next_or_previous) {
    var temp_table_valid = this.state.table_valids.slice();
    var timings_temp = this.state.timings.slice();
    if (next_or_previous) {
      timings_temp.push(["Previous",new Date().getTime()]);
      temp_table_valid[i + 1] = 0;
      temp_table_valid[i] = 1;
    } else {
      timings_temp.push(["Next",new Date().getTime()]);
      temp_table_valid[i] = 0;
      temp_table_valid[i + 1] = 1;
    }
    this.setState({
      timings: timings_temp,
      table_valids: temp_table_valid
    });
  }
  //Whenever a candidate detects a click, it sends that fact to CandidateTable
  //CandidateTable sends that up to Office with the table_index and index
  //handleClick will then change the state of the checkboxvalues array
  //All boxes in the row and column of the focused box will be set to 0
  //The focused box itself will be toggled
  handleClick(table_index, index) {
    var timings_temp = this.state.timings.slice();
    timings_temp.push([table_index,index,new Date().getTime()]);
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
      timings: timings_temp,
      final_choices: choices_temp
    });
  }
  componentDidMount() {
    for (let j = 0; j < 3; j++) {
      if (1 - this.state.table_valids[j]) {
        for (let k = 0; k < this.props.candidates.length; k++) {
          document.getElementById(
            String(j) + this.props.candidates[k].name
          ).disabled = true;
        }
      }
    }
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
    for (let j = 0; j < 3; j++) {
      if (1 - this.state.table_valids[j]) {
        for (let k = 0; k < this.props.candidates.length; k++) {
          document.getElementById(
            String(j) + this.props.candidates[k].name
          ).disabled = true;
        }
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

export default class ClaudiaZieglerAcemyanDesign extends Component {
  render() {
    return (
      <div className="mdl-grid">
        <Election />
      </div>
    );
  }
}

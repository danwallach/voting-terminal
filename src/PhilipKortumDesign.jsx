import React, { Component } from "react";
import * as firebase from "firebase";

import CandidateTable from "./CandidateTable";
import DesignHeading from "./DesignHeading";

import election from "./election.json";
import FileSaver from "file-saver";
import SubmitButton from "./SubmitButton";
import "./Button.css";
import { hashHistory } from "react-router";

class Office extends React.Component {
  //Office is the logic layer that contains and distributes most of the information
  constructor(props) {
    super(props);
    var timings_temp = [];
    timings_temp.push(["Begin", new Date().getTime()]);

    this.secondsElapsed = 0;
    this.events = [];

    this.state = {
      timings: timings_temp,
      final_choices: [null, null, null],
      table_valids: [1, 0, 0]
    };
  }
  componentDidMount() {
    this.timer = setInterval(() => this.secondsElapsed++, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);

    const { subjectNumber, office } = this.props;
    const { final_choices } = this.state;
    const { events } = this;
    firebase.database().ref().push().set({
      designer: "Philip Kortum",
      events: events,
        subjectNumber: subjectNumber,
      contests: [
        {
          office: office,
          choices: final_choices
        }
      ]
    });
  }
  //creates one candidate table
  renderCandidateTable(index) {
    let previousButtonCaption = "";
    let nextButtonCaption = "";
    switch (index) {
      case 0:
        nextButtonCaption = "Go to your 2nd choice";
        break;
      case 1:
        previousButtonCaption = "Return to your 1st choice";
        nextButtonCaption = "Make your 3rd choice";
        break;
      case 2:
        previousButtonCaption = "Return to your 2nd choice";
        break;
      default:
        break;
    }
    return (
      <div style={this.state.table_valids[index] ? {} : { display: "none" }}>
        <div className="mdl-grid">
          <CandidateTable
            onClick={(t, i) => this.handleClick(t, i)}
            onNext={() => this.handleNext(index)}
            onPrevious={() => this.handlePrevious(index)}
            candidates={this.props.candidates}
            choiceNo={index + 1}
            choice={this.state.final_choices[index]}
            disabled={this.state.table_valids[index] === 0 ? true : false}
            previousChoices={this.state.final_choices.slice(0, index)}
            boldSelectedCandidate={true}
            hidePreviouslySelectedCheckboxes={true}
            size={12}
          />
        </div>
        <div className="button-row">
          <div
            className="button-container"
            style={
              index !== 0 ? { display: "inline-block" } : { display: "none" }
            }
          >
            <div>
              <button
                className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
                onClick={() => this.handlePrevious(index)}
              >
                <i className="material-icons">arrow_back</i>
              </button>
            </div>
            <div>
              <p className={`mdc-typography--caption`}>
                {previousButtonCaption}
              </p>
            </div>
          </div>
          <div
            className="button-container"
            style={Object.assign(
              {},
              { float: "right" },
              index !== 2 ? { display: "inline-block" } : { display: "none" }
            )}
          >
            <div>
              <button
                className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect"
                onClick={() => this.handleNext(index)}
                disabled={
                  this.state.final_choices[index] === null ? true : false
                }
              >
                <i className="material-icons">arrow_forward</i>
              </button>
            </div>
            <div>
              <p
                className={
                  `mdc-typography--caption ${this.state.final_choices[index] === null && "disabled"}`
                }
              >
                {nextButtonCaption}
              </p>
            </div>
          </div>
          <div
            className="button-container"
            style={Object.assign(
              {},
              { float: "right" },
              index === 2 ? { display: "inline-block" } : { display: "none" }
            )}
          >
            <SubmitButton
              final_choices={this.state.final_choices}
              onClick={() => this.handleSubmit()}
            />
          </div>
        </div>
      </div>
    );
  }
  handleSubmit() {
    var timings = this.state.timings.slice();
    timings.push(["End", new Date().getTime()]);
    var blob = new Blob([JSON.stringify(timings)], {
      typ: "text/plain; charset=utf-8"
    });
    FileSaver.saveAs(blob, "Kortum" + this.props.subjectNumber + ".txt");

    const { events, secondsElapsed } = this;
    this.events = [
      ...events,
      { event: "Submit", secondsElapsed: secondsElapsed }
    ];

    hashHistory.push("/finalpage");
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
        <DesignHeading />
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
    timings_temp.push(["Next", date.getTime()]);
    if (this.state.final_choices[index]) {
      var valid_temp = this.state.table_valids.slice();
      valid_temp[index] = 0;
      valid_temp[index + 1] = 1;
      this.setState({
        timings: timings_temp,
        table_valids: valid_temp
      });
    }

    const { events, secondsElapsed } = this;
    this.events = [
      ...events,
      { event: "Next Button", secondsElapsed: secondsElapsed }
    ];
  }
  handlePrevious(index) {
    var date = new Date();
    var timings_temp = this.state.timings.slice();
    timings_temp.push(["Previous", date.getTime()]);
    var valid_temp = this.state.table_valids.slice();
    valid_temp[index] = 0;
    valid_temp[index - 1] = 1;
    this.setState({
      table_valids: valid_temp,
      timings: timings_temp
    });

    const { events, secondsElapsed } = this;
    this.events = [
      ...events,
      { event: "Previous Button", secondsElapsed: secondsElapsed }
    ];
  }
  handleClick(table_index, index) {
    var date = new Date();
    var timings_temp = this.state.timings.slice();
    timings_temp.push([table_index, index, date.getTime()]);
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

    const { events, secondsElapsed } = this;
    this.events = [
      ...events,
      { choices: choices_temp, secondsElapsed: secondsElapsed }
    ];

    this.setState({
      final_choices: choices_temp,
      timings: timings_temp
    });
  }
}

class Contest extends Component {
  render() {
    return (
      <Office
        office={this.props.contest.office}
        subjectNumber={this.props.subjectNumber}
        candidates={this.props.contest.candidates}
      />
    );
  }
}

class Election extends Component {
  render() {
    return (
      <Contest
        subjectNumber={this.props.subjectNumber}
        contest={election.contests[0]}
      />
    );
  }
}

export default class PhilipKortumDesign extends Component {
  render() {
    return <Election subjectNumber={this.props.location.query.subjectNumber} />;
  }
}

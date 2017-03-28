import React, { Component } from "react";
import * as firebase from "firebase";

import CandidateTable from "./CandidateTable";
import DesignHeading from "./DesignHeading";

import election from "./election.json";
import FileSaver from "file-saver";
import SubmitButton from "./SubmitButton";
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
      choices: [null, null, null]
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => this.secondsElapsed++, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);

    const { subjectNumber, office } = this.props;
    const { choices } = this.state;
    const { events } = this;
    firebase.database().ref().push().set({
      designer: "San Francisco",
      events: events,
        subjectNumber: subjectNumber,
      contests: [
        {
          office: office,
          choices: choices
        }
      ]
    });
  }
  //Whenever a candidate detects a click, it sends that fact to CandidateTable
  //CandidateTable sends that up to Office with the table_index and index
  //handleClick will then change the state of the checkboxvalues array
  //All boxes in the row and column of the focused box will be set to 0
  //The focused box itself will be toggled
  handleClick = (table_index, index) => {
    var timings_temp = this.state.timings.slice();
    timings_temp.push([table_index, index, new Date().getTime()]);
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

    const { events, secondsElapsed } = this;
    this.events = [
      ...events,
      { choices: choices_temp, secondsElapsed: secondsElapsed }
    ];

    this.setState({
      timings: timings_temp,
      choices: choices_temp
    });
  };
  //creates one candidate table
  handleSubmit() {
    var timings = this.state.timings.slice();
    timings.push(["End", new Date().getTime()]);
    var blob = new Blob([JSON.stringify(timings)], {
      typ: "text/plain; charset=utf-8"
    });
    FileSaver.saveAs(blob, "SF" + this.props.subjectNumber + ".txt");

    const { events, secondsElapsed } = this;
    this.events = [
      ...events,
      { event: "Submit", secondsElapsed: secondsElapsed }
    ];

    hashHistory.push("/finalpage");
  }
  renderCandidateTable(index) {
    return (
      <CandidateTable
        onClick={this.handleClick}
        candidates={this.props.candidates}
        choiceNo={index + 1}
        choice={this.state.choices[index]}
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
        <DesignHeading />
        <div className="mdc-layout-grid">
          {tables}
          <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-12">
            <SubmitButton onClick={() => this.handleSubmit()} />
          </div>
        </div>
      </div>
    );
  }
}

class Contest extends Component {
  render() {
    return (
      <Office
        subjectNumber={this.props.subjectNumber}
        office={this.props.contest.office}
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

export default class SanFranciscoDesign extends Component {
  render() {
    return <Election subjectNumber={this.props.location.query.subjectNumber} />;
  }
}

import React, { Component } from "react";
import { hashHistory } from "react-router";
import FileSaver from "file-saver";
import * as firebase from "firebase";

import CandidateTable from "./CandidateTable";
import SubmitButton from "./SubmitButton";
import DesignHeading from "./DesignHeading";
import ArrowButton from "./ArrowButton";

import election from "./election.json";
import "./ClaudiaZieglerAcemyanDesign.css";
class Office extends React.Component {
  //Creation of a timer that is later recorded for data gathering purposes
  constructor(props) {
    super(props);
    var timings_temp = [];
    timings_temp.push(["Begin", new Date().getTime()]);
    this.msElapsed = 0;
    this.events = [];
    this.state = {
      timings: timings_temp,
      final_choices: [null, null, null],
      table_valids: [1, 0, 0]
    };
  }

  componentDidMount() {
    //On creation of the component, timer begins ticking
    this.timer = setInterval(() => this.msElapsed++, 1);
  }

  componentWillUnmount() {
    //Puts all the data into variables and pushes to a firebase server
    //Occurs when Component will dissappear (Unmount)
    clearInterval(this.timer);

    const { subjectNumber, office } = this.props;
    const { final_choices } = this.state;
    const { events } = this;
    firebase.database().ref().push().set({
      designer: "Claudia Ziegler Acemyan",
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
    /**
     * table_valids is the array of the validity of tables
     * table_valids[0]=0 means that the 0th table is invalid
     * table_valids[1]=1 means that the 1st table is valid
     * don't ask why we didn't use booleans
     * onClick, Next, and Previous are functions that are passed from the tables and handled by the Parent of the tables
     * choiceNo is the index of the table
     * previousChoices are the choices from the tables prior to the one being created
     */
    const { table_valids, final_choices } = this.state;
    const inFocus = table_valids.indexOf(1);
    return (
      <CandidateTable
        onClick={(t, i) => this.handleClick(t, i)}
        onNext={() => this.handleNext(index)}
        onPrevious={() => this.handlePrevious(index)}
        candidates={this.props.candidates}
        choiceNo={index + 1}
        choice={final_choices[index]}
        disabled={this.state.table_valids[index] === 0 ? true : false}
        previousChoices={final_choices.slice(0, index)}
        boldSelectedCandidate={true}
        hidePreviouslySelectedCheckboxes={true}
        inFocus={index === inFocus ? true : false}
        size={3}
      />
    );
  }
  handleSubmit() {
    /**
     * upon pressing the submit button,
     * the timings array (array filled with timing events) will be captured
     * the end event will be added to that array as well as the events array
     * a file will be saved with the timings
     */
    var timings = this.state.timings.slice();
    timings.push(["End", new Date().getTime()]);
    var blob = new Blob([JSON.stringify(timings)], {
      typ: "text/plain; charset=utf-8"
    });
    FileSaver.saveAs(blob, "Claudia" + this.props.subjectNumber + ".txt");

    const { events, msElapsed } = this;
    this.events = [
      ...events,
      { event: "Submit", secondsElapsed: msElapsed /1000}
    ];

    hashHistory.push("/finalpage");
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
        <DesignHeading />
        <div className="mdc-layout-grid">
          {tables}
          <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-12">
            <SubmitButton
              final_choices={this.state.final_choices}
              onClick={() => this.handleSubmit()}
            />
          </div>
        </div>
      </div>
    );
  }
  handleButton(i, next_or_previous) {
    var temp_table_valid = this.state.table_valids.slice();
    var timings_temp = this.state.timings.slice();
    //Adding the Next/Previous events to the timing array
    //Changing which table is valid to be clicked
    if (next_or_previous) {
      timings_temp.push(["Previous", new Date().getTime()]);
      temp_table_valid[i + 1] = 0;
      temp_table_valid[i] = 1;
    } else {
      timings_temp.push(["Next", new Date().getTime()]);
      temp_table_valid[i] = 0;
      temp_table_valid[i + 1] = 1;
    }
    //Adding this event to the events array
    const { events, msElapsed } = this;
    this.events = [
      ...events,
      {
        event: next_or_previous ? "Previous Button" : "Next Button",
        secondsElapsed: msElapsed/1000
      }
    ];

    this.setState({
      timings: timings_temp,
      table_valids: temp_table_valid
    });
  }
  handleClick(table_index, index) {
    var timings_temp = this.state.timings.slice();
    timings_temp.push([table_index, index, new Date().getTime()]);
    var cand_name = this.props.candidates[index].name;
    var choices_temp = this.state.final_choices.slice();
    //Setting or clearing final_choices based on the name of the choice
    //final_choices is controlled by the temp variable choices_temps
    if (choices_temp[table_index] === cand_name) {
      choices_temp[table_index] = null;
    } else {
      choices_temp[table_index] = cand_name;
    }
    //If another table has the same choice as the one just picked, clear it
    for (let i = 0; i < 3; i++) {
      if (i !== table_index && choices_temp[i] === choices_temp[table_index]) {
        choices_temp[i] = null;
      }
    }

    const { events, msElapsed } = this;
    this.events = [
      ...events,
      { choices: choices_temp, secondsElapsed: msElapsed /1000}
    ];

    this.setState({
      timings: timings_temp,
      final_choices: choices_temp
    });
  }
}
//The Google Civic Data API contains many layers
//Any single election is part of an office,
//which is part of a contest, part of an election etc.
//This is why our code has so many layers where things are passed down
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

export default class ClaudiaZieglerAcemyanDesign extends Component {
  render() {
    return (
      <div className="mdc-layout-grid">
        <Election subjectNumber={this.props.location.query.subjectNumber} />
      </div>
    );
  }
}

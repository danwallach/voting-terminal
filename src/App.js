import React, { Component } from 'react';
import './App.css';

const tdStyle = {
  textAlign: "left",
};
class Candidate extends React.Component {
  render() {
    return (
      <tr>
        <td style={tdStyle} classname="mdl-data-table__cel--non-numeric">
            <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect">
              <input type="checkbox" className="mdl-checkbox__input"/>
                <span className="mdl-checkbox__label">{this.props.name}</span>
            </label>
        </td>
      </tr>
    );
  }
}

const writeInCandidate = 
  <form action="#">
    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
      <input className="mdl-textfield__input" type="text" id="sample3" />
      <label className="mdl-textfield__label" for="sample3">Text...</label>
    </div>
  </form>
class CandidateTable extends React.Component {
  render () {
    var rows = []
    this.props.candidates.forEach(function(candidate) {
      rows.push(<Candidate name={candidate} />);
    });
    rows.push(
      <Candidate name={writeInCandidate} />
    );
    return (
      <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
        <thead>
          <tr>
            <th className="mdl-data-table__cell--non-numberic">First Choice
      <p>Vote for One</p></th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
}

var CANDIDATES = ["Ocean", "Mountain", "Lake", "Forest", "Beach"];

class App extends Component {
  render() {
    return (
      <CandidateTable candidates={CANDIDATES} />
    );
  }
}

export default App;

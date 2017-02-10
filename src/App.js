import React, { Component } from 'react';
import './App.css';

class Candidate extends React.Component {
  render() {
    return (
      <tr>
        <td className="mdl-data-table__cel--non-numeric">
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
      <label className="mdl-textfield__label" htmlFor="sample3">Write-in Candidate</label>
    </div>
  </form>
class CandidateTable extends React.Component {
  render () {
    var head;
    console.log(this.props);
      for(let i=0;i<this.props.choiceNo;i++){
        console.log(i);
        head=<tr>
        <th className="mdl-data-table__cell--non-numberic">
        Choice #{i+1}
        <p>Choose a candidate. Choice may not be same as previous choice</p>
        </th>
        </tr>
      }
    /*switch (this.props.choiceNo) {
      case 1:
        head = <tr>
          <th className="mdl-data-table__cell--non-numberic">
            First Choice
            <p>Vote for One</p>
          </th>
        </tr>;
        break;
      case 2:
        head = <tr>
          <th className="mdl-data-table__cell--non-numberic">
            Second Choice
            <p>Vote for One: Must be different than your first choice</p>
          </th>
        </tr>;
        break;
      case 3:
        head = <tr>
          <th className="mdl-data-table__cell--non-numberic">
            Third Choice
            <p>Vote for One: Must be different than your first and second choices</p>
          </th>
        </tr>;
        break;
      default:
    }*/
    var rows = [];
    this.props.candidates.forEach((candidate, index) => {
      rows.push(<Candidate name={candidate} key={index}/>);
    });
    rows.push(
      <Candidate name={writeInCandidate} key={999}/>
    );
    return (
      <table style={{float: "left"}} className="mdl-data-table mdl-js-data-table mdl-shadow--2dp mdl-cell mdl-cell--8-col-tablet">
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

var CANDIDATES = ["Ocean", "Mountain", "Lake", "Forest", "Beach"];

class Race extends React.Component {
  render() {
    return (
      <div className="mdl-cell mdl-cell--12-col">
        <h2 className="mdl-typography--subhead">{this.props.name}</h2>
        <p className="mdl-typography--body-1">Vote your first, second, and third choices</p>
        <div>
          <CandidateTable candidates={CANDIDATES} choiceNo={1}/>
          <CandidateTable candidates={CANDIDATES} choiceNo={2}/>
          <CandidateTable candidates={CANDIDATES} choiceNo={3}/>
        </div>
      </div>
    )
  }
}

class LevelOfGovernment extends Component {
  render() {
    return (
      <div className="mdl-cell mdl-cell--12-col">
        <h1 className="mdl-typography--title">{this.props.governmentLevel}</h1>
        <Race name="Favorite Nature Setting" />
      </div>
    )
  }
}


class App extends Component {
  render() {
    return (
      <div className="mdl-grid">
        <LevelOfGovernment governmentLevel="City and County" />
      </div>
    );
  }
}

export default App;

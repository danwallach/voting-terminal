import React, { Component } from 'react';
import './App.css';

const tdStyle = {
  textAlign: "left",
};

class Candidate extends React.Component {
  render() {
    return (
      <tr>
      <td nowrap style={tdStyle} className="mdl-data-table__cel--non-numeric">
      <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect">
      <input type="checkbox" className="mdl-checkbox__input"
      onClick={() => this.props.onClick()}/>
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

var CHECKBOXVALUES = [[1, 0, 0, 0, 0, 0],[0,0,0,0,0,0],[0,0,0,0,0,0]]

class CandidateTable extends React.Component {
  renderCandidate(candidate, index){
    return <Candidate name={candidate}
    key={index}
    checkValue={CHECKBOXVALUES[index]}
    onClick={() => this.handleClick(index)}
      />;
  }

  handleClick(i){
    if(CHECKBOXVALUES[this.props.choiceNo-1][i]===1){
      CHECKBOXVALUES[this.props.choiceNo-1][i]=0
    }
    else{
      CHECKBOXVALUES[this.props.choiceNo-1][i]=1
    }
    alert(CHECKBOXVALUES)
    alert(this.props.choiceNo)
  }
  render () {
    var head;
      for(let i=0;i<this.props.choiceNo;i++){
        head=<tr>
        <th className="mdl-data-table__cell--non-numberic">
        Choice #{i+1}
        <p>Choose a candidate. Choice may not be same as previous choice</p>
        </th>
        </tr>
      }
    var rows = [];
    this.props.candidates.forEach((candidate, index) => {
      rows.push(this.renderCandidate(candidate, index));
    });
    rows.push(
      <Candidate name={writeInCandidate} key={999} onClick={() => this.handleClick(6)} />
    );
    return (
      <table style={{float: " left"}} className="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
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
      <div>
        <h2>{this.props.name}</h2>
        <p>Vote your first, second, and third choices</p>
        <CandidateTable candidates={CANDIDATES} choiceNo={1}/>
        <CandidateTable candidates={CANDIDATES} choiceNo={2}/>
        <CandidateTable candidates={CANDIDATES} choiceNo={3}/>
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <h1>City and County</h1>
        <Race name="Favorite Nature Setting" />
      </div>
    );
  }
}

export default App;

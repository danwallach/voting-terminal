import React, { Component } from 'react';
import './App.css';

var CHECKBOXVALUES = [[1, 0, 0, 0, 0, 0],[0,0,0,0,1,0],[0,0,0,0,0,0]]
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
      onClick={() => this.props.onClick()}
      checked={CHECKBOXVALUES[this.props.tableValue][this.props.indexValue]===0? "" : "checked"}
      />
      <span className="mdl-checkbox__label">
      {this.props.name}
      {CHECKBOXVALUES[this.props.tableValue][this.props.indexValue]}
      </span>
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
  renderCandidate(candidate, index){
    return <Candidate name={candidate}
    key={index}
    indexValue={index}
    tableValue={this.props.choiceNo-1}
    onClick={() => this.handleClick(index)}
      />;
  }

  handleClick(index){
    const table = this.props.choiceNo - 1;
    this.forceUpdate();
    if(CHECKBOXVALUES[table][index]===1){
      CHECKBOXVALUES[table][index]=0
    }
    else{
      CHECKBOXVALUES[table][index]=1
    }//TODO NO MAGIC NUMBERS
    for(let i =0;i < 3; i++){
      if(i!==table){
        CHECKBOXVALUES[i][index]=0;
      }
    }
    for(let i = 0; i < 6; i++){
      if(i!==index){
        CHECKBOXVALUES[table][i]=0;
      }
    }
    alert(CHECKBOXVALUES)
    this.props.parentRender();
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
    /*rows.push(
      <Candidate name={writeInCandidate} key={999} onClick={() => this.handleClick(6)} />
    );*/
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

var CANDIDATES = ["Ocean", "Mountain", "Lake", "Forest", "Beach","Flarp"];

class Race extends React.Component {
  reRenderAll(){
    alert("Updating")
    //this.forceUpdate();
    this.forceUpdate();
  }
  render() {
    return (
      <div>
        <h2>{this.props.name}</h2>
        <p>Vote your first, second, and third choices</p>
        <CandidateTable parentRender={this.reRenderAll} candidates={CANDIDATES} choiceNo={1}/>
        <CandidateTable parentRender={this.reRenderAll} candidates={CANDIDATES} chocandidates={CANDIDATES} choiceNo={2}/>
        <CandidateTable parentRender={this.reRenderAll} candidates={CANDIDATES} choiceNo={3}/>
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

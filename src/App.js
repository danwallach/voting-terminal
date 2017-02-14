import React, { Component } from 'react';
import './App.css';

class Candidate extends React.Component {
  render() {
    return (
      <tr>
        <td className="mdl-data-table__cel--non-numeric">
          <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect">
            <input
              type="checkbox"
              className="mdl-checkbox__input"
              checked={this.props.checkValue}
              onClick={() => this.props.onClick()}
            />
            <span className="mdl-checkbox__label">
              {this.props.name}
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
      <label className="mdl-textfield__label" htmlFor="sample3">Write-in candidate</label>
    </div>
  </form>


class CandidateTable extends React.Component {
  renderCandidate(candidate, index){
    return <Candidate name={candidate}
    key={index}
    checkValue={this.props.check_table[index]}
    onClick={() => this.props.parentRender(this.props.choiceNo-1, index)}
      />;
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

var CANDIDATES = ["Barack H. Obama - DEM", "George W. Bush - REP", "William J. Clinton - DEM", "George H. W. Bush - DEM", "Ronald W. Reagan - REP","James E. Carter - DEM" ];

class Race extends React.Component {
  constructor(){
    super();
    this.state = {
      check_box_values: [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]],
    };
  }
  render() {
    return (
      <div className="mdl-cell mdl-cell--12-col">
        <h2 className="mdl-typography--subhead">{this.props.name}</h2>
        <p className="mdl-typography--body-1">Vote your first, second, and third choices</p>
        <div>
        <CandidateTable check_table={this.state.check_box_values[0]} parentRender={(t,i) => this.reRenderAll(t,i)} candidates={CANDIDATES} choiceNo={1}/>
        <CandidateTable check_table={this.state.check_box_values[1]} parentRender={(t,i) => this.reRenderAll(t,i)} candidates={CANDIDATES} choiceNo={2}/>
        <CandidateTable check_table={this.state.check_box_values[2]} parentRender={(t,i) => this.reRenderAll(t,i)} candidates={CANDIDATES} choiceNo={3}/>
        </div>
      </div>
    )
  }
  checkUsingArray(){

  }
  reRenderAll(table_index, index){
    var temp_prevent_mutation = this.state.check_box_values.slice();
    //alert(table_index)
    //alert(index)
    for(var i = 0; i < temp_prevent_mutation.length; i++){
      for(var j = 0; j< temp_prevent_mutation[i].length; j++){
        if(i===table_index ^ j===index){
          temp_prevent_mutation[i][j]=0;
        }
      }
    }
    temp_prevent_mutation[table_index][index] = 1 - temp_prevent_mutation[table_index][index]
    this.setState({check_box_values: temp_prevent_mutation})
  }
  componentDidUpdate() {
    document.querySelectorAll('.mdl-js-checkbox').forEach((element) => element.MaterialCheckbox.checkToggleState());
  }
}

class LevelOfGovernment extends Component {
  render() {
    return (
      <div className="mdl-cell mdl-cell--12-col">
        <h1 className="mdl-typography--title">{this.props.governmentLevel}</h1>
        <Race name="U.S. President" />
      </div>
    )
  }
}


class App extends Component {
  render() {
    return (
      <div className="mdl-grid">
        <LevelOfGovernment governmentLevel="Federal" />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
// eslint-disable-next-line
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
      />
      <span className="mdl-checkbox__label">
      {this.props.name}
      {this.props.checkValue}
      {this.props.test_thingy_value}
      </span>
      </label>
      </td>
      </tr>
    );
  }
}
// eslint-disable-next-line
const writeInCandidate =
    <form action="#">
    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
    <input className="mdl-textfield__input" type="text" id="sample3" />
    <label className="mdl-textfield__label" htmlFor="sample3">Write-in Candidate</label>
    </div>
  </form>


class CandidateTable extends React.Component {
  constructor(){
    super();
    this.state = {
      test_variable: [1,0,0,0,0,0],
    };
  }
  renderCandidate(candidate, index){
    return <Candidate name={candidate}
    key={index}
    indexValue={index}
    tableValue={this.props.choiceNo-1}
    checkValue={this.props.check_table[index]}
    test_thingy_value = {this.state.test_variable[index]}
    onClick={() => this.props.parentRender()}
      />;
  }

  handleClick(index){

    alert("Middle level onClick called candidate at ");
    var fwaaahhh = this.state.test_variable.slice();
    alert(fwaaahhh)
    fwaaahhh = [0,0,0,0,0,0]
    alert(fwaaahhh)
    this.setState({test_variable: fwaaahhh});
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
  constructor(){
    super();
    this.state = {
      check_box_values: [[1,0,0,0,0,0],[0,1,0,0,0,0],[0,0,1,0,0,0]],
    };
  }
  render() {
    return (
      <div>
        <h2>{this.props.name}</h2>
        <p>Vote your first, second, and third choices</p>
        <CandidateTable check_table={this.state.check_box_values[0]} parentRender={() => this.reRenderAll()} candidates={CANDIDATES} choiceNo={1}/>
        <CandidateTable check_table={this.state.check_box_values[1]} parentRender={() => this.reRenderAll()} candidates={CANDIDATES} choiceNo={2}/>
        <CandidateTable check_table={this.state.check_box_values[2]} parentRender={() => this.reRenderAll()} candidates={CANDIDATES} choiceNo={3}/>
      </div>
    )
  }
  reRenderAll(){
    var temp_prevent_mutation = this.state.check_box_values.slice();
    temp_prevent_mutation= [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]]
    this.setState({check_box_values: temp_prevent_mutation})
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

import React from "react";
import "./App.css";
/* Welcome to the voting terminal San Francisco Style code
 * This code is based off of React, a javascript framework
 * React philosophy indicates that javascript, html, and JSX should all be in the same file
 * This code is split into multiple layers, each its own class
 * Candidate is the bottom layer, composed of a checkbox and candidate name
 * Candidate Table is the next layer, a table of... Candidates
 * Office is the highest important layer, it has 3 Candidate Tables
 * The next two layers are Level of Government and App, but you don't have to worry about those
 *
 * Each layer passes up and down certain values
 * Lets start at the top important layer, Office
 * Office is constructed with an array called checkboxvalues which contains information
 * about each checkbox and its supposed value
 * Whenever a box is checked, every box in its row and column must be unchecked
 * This logic is done in handleClick
 * the Office layer sends down an array of check values to each table
 * it also sends down an onClick function and an array of candidate names
 * The table layer doesn't do much, it creates Candidates based on the cand names
 * It passes a checked value to each candidate, an onclick function, and a cand name
 *
 * The Candidate renders based on its checked value and cand name
 * Whenever it is clicked, it does nothing.
 * Instead, it sends up the onClick function to table, which immediately sends
 * the onClick funtion up to Office's handleClick function<Plug>(neosnippet_expand)
 * The funtion is sent up with parameters indicating the position of the box clicked
 * The checkboxvalues state array is changed in Office,
 * and the candidates are re-rendered based on the new state
 * A helper function called componentDidUpdate listens for a rerender and
 * unchecks or checks the various checkboxes based on the values from the array
 */

class App extends React.Component {
  render() {
    return this.props.children;
  }
}

export default App;

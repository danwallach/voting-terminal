import React from "react";
import "./App.css";
/**
 * The parent of almost everything else in the project
 * Merely houses children
 */
class App extends React.Component {
  render() {
    return this.props.children;
  }
}

export default App;

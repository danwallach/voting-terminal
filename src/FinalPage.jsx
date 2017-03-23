import React from "react";
import { hashHistory } from "react-router";

class FinalPage extends React.Component {
  constructor() {
    super();
    this.state = { counter: 0 };
  }
  handleClick = () => {
    if (this.state.counter >= 4) {
      hashHistory.push("/");
    }
    this.setState(prevState => ({ counter: prevState.counter + 1 }));
  };
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <h1 className="mdc-typography--display4 mdc-typography--adjust-margin">
          You vot<span onClick={this.handleClick}>e</span>d!
        </h1>
        <h2 className="mdc-typography--display2 mdc-typography--adjust-margin">
          Thank you!
        </h2>
      </div>
    );
  }
}

export default FinalPage;

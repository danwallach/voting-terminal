import React from "react";
import { hashHistory } from "react-router";

import "./StartPage.css";
import "./Button.css";

const defaultProps = {
  location: {
    query: {
      route: "/sf",
      subjectNumber: ""
    }
  }
};

class StartPage extends React.Component {
  handleClick = () => {
    const { route, subjectNumber } = this.props.location.query;
    hashHistory.push(`${route}?subjectNumber=${subjectNumber}`);
  };
  render() {
    return (
      <div className="button-container">
        <div className="start-button-container">
          <button
            id="start-button"
            className="mdc-button mdc-button--primary mdc-button--raised"
            onClick={this.handleClick}
          >
            Start voting
          </button>
        </div>
        <div>
          <p className="mdc-typography--caption">
            {" "}Tap here to begin the study
          </p>
        </div>
      </div>
    );
  }
}

StartPage.defaultProps = defaultProps;

export default StartPage;

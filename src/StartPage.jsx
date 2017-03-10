import React from "react";
import { hashHistory } from "react-router";

import "./StartPage.css";

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
      <button
        id="start-button"
        className="mdc-button mdc-button--primary"
        onClick={this.handleClick}
      >
        Start voting
      </button>
    );
  }
}

StartPage.defaultProps = defaultProps;

export default StartPage;

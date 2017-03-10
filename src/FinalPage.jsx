import React from "react";

class FinalPage extends React.Component {
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <h1 className="mdc-typography--display4 mdc-typography--adjust-margin">
          You voted!
        </h1>
        <h2 className="mdc-typography--display2 mdc-typography--adjust-margin">
          Thank you!
        </h2>
      </div>
    );
  }
}

export default FinalPage;

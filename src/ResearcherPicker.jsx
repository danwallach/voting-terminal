import React from "react";
import { Link,hashHistory,Route } from "react-router";
import { MDCTextfield } from "@material/textfield/dist/mdc.textfield";
import screenfull from "screenfull";


import researchers from "./researchers.json";
import "./ResearcherPicker.css";
//This page allows you to choose a researcher to run, allows you to make the screen fullscreen, and allows you to enter a subject number
class ResearcherPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subjectNumber: "",
      fullscreen: screenfull.isFullscreen
    };
  }
  componentDidMount() {
    if (screenfull.enabled) {
      screenfull.onchange(() => {
        this.setState({ fullscreen: screenfull.isFullscreen });
      });
    }
  }
  handleChange = e => {
    this.setState({ subjectNumber: e.target.value });
  };
  handleClick = () => {
    if (screenfull.enabled) {
      screenfull.request();
    }
  };
  render() {
    const { subjectNumber, fullscreen } = this.state;
    //Choosing the researchers, if no subject number is chosen, it alerts that
    //Otherwise it pushes you to that researcher's page
    const body = researchers.reduce(
      (rows, researcher) => rows.concat(
        <div
          onClick={() => {
            if (!this.state.subjectNumber) {
              alert("No subject number chosen");
            } else {
              hashHistory.push(`${researcher.route}?subjectNumber=${ subjectNumber }`);
            }
          }}
          className="mdl-list__item mdl-card__actions mdl-card--border"
        >
          <span className="mdl-list__item-primary-content">
            <i
              style={{
                backgroundImage: "url(" + researcher.avatarUrl + ")",
                backgroundSize: "auto 40px"
              }}
              className="material-icons mdl-list__item-avatar"
            />
            <span>{researcher.name}</span>
          </span>
        </div>
      ),
      []
    );
    console.log(body);
    return (
      <div>
        <div className="mdl-card mdl-shadow--2dp">
          <div className="mdl-card__title">
            <h2 className="mdl-card__title-text">Choose a researcher</h2>
          </div>
          {body}
        </div>
        <div className="subject-number-container">
          <Textfield subjectNumber={subjectNumber} onChange={this.handleChange}>
            Subject number
          </Textfield>
        </div>
        <i
          className="material-icons app-fab--absolute"
          onClick={this.handleClick}
          style={fullscreen ? { display: "none" } : { display: "block" }}
        >
          fullscreen
        </i>
      </div>
    );
  }
}
//Creation of a textfield allowing you to enter a subject number
class Textfield extends React.Component {
  componentDidMount() {
    MDCTextfield.attachTo(document.querySelector(".mdc-textfield"));
  }
  render() {
    const { subjectNumber, onChange } = this.props;
    return (
      <label className="mdc-textfield">
        <input
          type="number"
          className="mdc-textfield__input"
          onChange={onChange}
          value={subjectNumber}
        />
        <span className="mdc-textfield__label">{this.props.children}</span>
      </label>
    );
  }
}

export default ResearcherPicker;

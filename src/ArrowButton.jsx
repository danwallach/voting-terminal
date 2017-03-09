import React from 'react';

import "./Button.css";

class ArrowButton extends React.Component {
  render() {
    var disabled = true;
    var title = "arrow_forward";
    var tb_vld = this.props.table_valids;
    var tb_vld_num;
    var next_or_previous = 0;
    for (let i = 0; i < tb_vld.length; i++) {
      if (tb_vld[i]) {
        tb_vld_num = i;
      }
    }
    var dex = this.props.buttonNo;
    var fnl_chc = this.props.final_choices;
    var valid;
    if (tb_vld_num - dex > 0) {
      title = "arrow_back";
      next_or_previous = 1;
    }
    if (next_or_previous) {
      valid = tb_vld[dex] || tb_vld[dex + 1];
    } else {
      valid = (tb_vld[dex] || tb_vld[dex + 1]) && fnl_chc[dex];
    }
    disabled = !valid;
    let buttonCaption = "";
    switch (this.props.buttonNo) {
      case 0:
        switch (title) {
          case "arrow_forward":
            buttonCaption = "Go to your 2nd choice";
            break;
          case "arrow_back":
            buttonCaption = "Return to your 1st choice";
            break;
        }
        break;
      case 1:
        switch (title) {
          case "arrow_forward":
            buttonCaption = "Make your 3rd choice";
            break;
          case "arrow_back":
            buttonCaption = "Return to your 2nd choice";
            break;
        }
        break;
        buttonCaption = "Button 1";
        break;
      default:
        buttonCaption = "";
    }
    return (
      <div
        className="mdc-layout-grid__cell mdc-layout-grid__cell--span-1 mdc-layout-grid__cell--align-middle button-container"
      >
        <div>
          <button
            id={this.props.buttonNo + "button"}
            className={`mdl-button mdl-js-button mdl-button--raised ${title === "arrow_forward" && "mdl-button--colored mdc-elevation--z12"} mdl-js-ripple-effect`}
            onClick={() =>
              this.props.onClick(this.props.buttonNo, next_or_previous)}
              disabled={disabled}
            >
              <i className="material-icons">{title}</i>
            </button>
          </div>
          <div>
            <p className={`mdc-typography--caption ${disabled && "disabled"}`}>
              {buttonCaption}
            </p>
          </div>
        </div>
    );
  }
}

export default ArrowButton;

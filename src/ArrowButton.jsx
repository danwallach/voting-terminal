import React from "react";

import "./Button.css";

class ArrowButton extends React.Component {
    //Honestly this code is badly written, please bear with me
  render() {
    var disabled = true;
    var title = "arrow_forward";
    var tb_vld = this.props.table_valids;
    var tb_vld_num;
    var next_or_previous = 0;
    /**
     * Loops through each table, checking if they are valid or not
     * Valid means the currently focused, non disabled table
     * Sets tb_valid_num to the number of the valid table
     */
    for (let i = 0; i < tb_vld.length; i++) {
      if (tb_vld[i]) {
        tb_vld_num = i;
      }
    }
    var dex = this.props.buttonNo;
    var fnl_chc = this.props.final_choices;
    var valid;
    //Titles the arrow using the index of the button and the index of the focused valid table
    //Changes the value of the variable checking if the button is a next button or a previous button
    if (tb_vld_num - dex > 0) {
      title = "arrow_back";
      next_or_previous = 1;
    }
    //Determines if the button is a valid button to be clicked
    //A button is valid if either table next to it is valid
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
          default:
            buttonCaption = "";
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
          default:
            buttonCaption = "";
            break;
        }
        break;
      //buttonCaption = "Button 1";
      //break;
      default:
        buttonCaption = "";
    }
    //onClick() passes the number of the button pressed and whether or not it was a next button or previous button
    return (
      <div
        className="mdc-layout-grid__cell mdc-layout-grid__cell--span-1 mdc-layout-grid__cell--span-8-tablet mdc-layout-grid__cell--span-4-phone mdc-layout-grid__cell--align-middle button-container"
      >
        <div>
          <button
            id={this.props.buttonNo + "button"}
            className={
              `mdl-button mdl-js-button mdl-button--raised ${title ===
                "arrow_forward" &&
                "mdl-button--colored mdc-elevation--z12"} mdl-js-ripple-effect`
            }
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

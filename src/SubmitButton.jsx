import React from "react"



class SubmitButton extends React.Component{
  render(){
        var choices = this.props.final_choices;
        var disable="True";
    if(choices[0] && choices[1] && choices[2]){
            disable="";

    }
    return (
          <button
            style={{float: "right"}}
      className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--primary"
            disabled={disable}
            onClick={() => this.props.onClick()}
            >Submit</button>

    );

  }

}

export default SubmitButton

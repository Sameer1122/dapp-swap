import React from "react";
import "./css/buysend.css";

function Send(props) {
  return (
    <div className="Send">
      <div className="inputs">
        <h3 className="txt">
            Address

        </h3>
        <input
          type="
            "
          name=""
          id=""
        />
       
      
        <h3 className="txt">
            Amount

        </h3>
        <input
          type="
            "
          name=""
          id=""
        />
        <button>Send</button>
        
        <button onClick={props.setterBell} >Close</button>
      
       
      </div>
    </div>
  );
}

export default Send;

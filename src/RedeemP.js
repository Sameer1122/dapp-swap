import React from "react";
import "./css/buysend.css";

function Send(props) {
  return (
    <div className="Send">
      <div className="inputs">
        <h3 className="txt">
          YOUR RECEIPT 🚀
          <br />
          <strong style={{ marginRight: "30px" }}>{props.code}</strong>
        </h3>

        <h1 className="txt2"></h1>

        <button onClick={props.settercode}>Close</button>
      </div>
    </div>
  );
}

export default Send;

import React from "react";
import { useState } from "react";

import "./css/buysend.css";
import eye from "./images/eye-slash-solid.svg";


function Send(props) {
    const [scode, setscode] = useState(true);

    const show_code = () =>{
        if(scode === false){
            setscode(true)
        }if(scode === true){
            setscode(false)
        }
    }

    return (
        <div className="Send" style={{ height: "45%", borderRadius: "20px", top: "20%", backgroundColor: "rgba(38, 39,40 , 0.9)" }}>
            <div className="inputs" style={{ textAlign: "center" }}>

                <h3 className="txt">
                    YOUR CODE 🚀
                    <br />
                    <strong style={{ marginRight: "30px" }}>

                        {scode ? (<>                         {props.code}
                        </>) : (<> *************** </>)}


                    </strong>





                </h3>

                <p style={{ color: "#fff" }}>
                    Thx For Buying Gift and  Copy Code And Save That 🔥
                </p>
                <h1 className="txt">

                </h1>



                <button onClick={show_code} >Hide/Show <img src={eye} alt="" width="35" /></button>
                <br />


                <button onClick={props.settercode}>Close</button>



            </div>
        </div>
    );
}

export default Send;

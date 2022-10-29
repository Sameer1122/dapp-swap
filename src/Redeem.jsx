import "./css/redeem.css";
import bell from "./images/bell.png";
import eye from "./images/eye-slash-solid.svg";

import Reacts from "react";
import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha,
} from "react-google-recaptcha-v3";

import { ethers } from "ethers";
import abi from "./abi.json";
import RedeemP from "./RedeemP";
import { React, useState, useRef, createRef, useEffect, Fragment } from "react";
import Reaptcha from "reaptcha";
import { BsFillBellFill } from "react-icons/bs";
var loadjs = require("loadjs");
function Redeem(props) {
  const [input, setInput] = useState("");
  const [btn, setbtn] = useState("Redeem");
  const [code, setcode] = useState();
  const [scode, setscode] = useState(false);
  const [icon, seticon] = useState("none");
  const [code_display, setcode_display] = useState("none");
  const [Redeems, setRedeems] = useState(false);
  const [im_not_robot, setim_not_robot] = useState(false);
  const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);

  const [load_, setload] = useState(false);
  // const recaptchaRef = React.createRef();

  function onRobot(value) {
    //console.log("Captcha value:", value);

    setim_not_robot(true);
  }
  function onExpired(value) {
    //console.log("Captcha value:", value);
    setim_not_robot(false);
  }
  function handleError(err) {
    console.log("Error in recaptcha", err);
  }
  const Redeem = async () => {
    setbtn("Redeeming");

    seticon(" ");
    const provider = new ethers.providers.JsonRpcProvider(
      "https://data-seed-prebsc-1-s1.binance.org:8545/"
    );
    const contract = new ethers.Contract(
      "0xfb1A50B1b21fA9ebAD6C55Ac441687F935a46B96",
      abi,
      provider
    );
    let code = input.toString();
    try {
      const data = await contract.isVaildCode(code);
      //  await data.wait()
      load();
      seticon("none");
    } catch (err) {
      setcode("NOT VAILD CODE");
      settercode();
      setbtn("Redeem");
      seticon("none");
    }
  };
  const load = () => {
    if (im_not_robot === false) {
      setload(true);
    }
    if (im_not_robot === true) {
      setbtn("Redeeming");

      seticon(" ");
      //  let code = "3534535"
      if (Redeems === false) {
        setRedeems(true);
        let url =
          "https://cryftcards.herokuapp.com/Redeem/" +
          input +
          "/" +
          props.address;
        fetch(url)
          .then(async (response) => {
            console.log(response.status);
            setbtn("Redeem");
            if (response.status == 200) {
              setTimeout(function () {
                setcode("Redeem Sucessful 🔥");
                setRedeems(false);
                setbtn("Redeem");
                seticon("none");
              }, 3000);
            }
            if (response.status == 401) {
              setTimeout(function () {
                setcode("NOT VAILD CODE");
                setRedeems(false);
                setbtn("Redeem");
                seticon("none");
              }, 500);
            }

            settercode();
          })
          .catch(() => {
            console.error("There was an error!");
            setRedeems(false);
            setbtn("Redeem");
            seticon("none");
          });
      }
    }
  };

  function settercode() {
    if (scode === false) {
      setscode(true);
    }
    if (scode === true) {
      setscode(false);
    }
  }

  function code_hide_show() {
    if (code_display === "none") {
      setcode_display(" ");
    }
    if (code_display === " ") {
      setcode_display("none");
    }
  }

  return (
    <>
      <div className="col-md-9">
        <div className="header">
          <h3>
            Gas Tank <br />
            {props.bal?.slice(0, 7)}
          </h3>

          <div className="bg-rounded">
            <img className="vector" src="./images/Vector.png" alt="" />
            <BsFillBellFill style={{ color: "white" }} />
          </div>
          <div className="bg-block"></div>
          <div className="name-addr">
            <h6>{props.address.substring(0, 16)}</h6>
          </div>
          <div className="hrz-separator"></div>
        </div>
        <div className="hrz-separator"></div>
        <div className=" redeem-content content">
          <div className="main-heading">
            {scode ? (
              <>
                <RedeemP settercode={settercode} code={code} />
              </>
            ) : (
              <></>
            )}
            <h1>Redeem Cryft Cards</h1>
            <div className="input-text">
              <input
                type="number"
                placeholder="Enter Serial Number"
                value={input}
                onInput={(e) => setInput(e.target.value)}
              />
              <div className="google">
                <GoogleReCaptcha onVerify={onRobot} />
              </div>

              <button
                type="button"
                onClick={load}
                style={{ marginTop: "10px" }}
              >
                {btn}
                <i
                  style={{ display: icon, background: "none" }}
                  className="fa fa-circle-o-notch fa-spin"
                ></i>
              </button>
            </div>
          </div>
        </div>
        <br />
        <div className="redeem-content2">
          <div className="inner-content">
            <h1>Redeemed Cryft Cards</h1>

            {props.redeems?.length > 0 ? (
              <div className="redeem-map">
                {props.redeems.map((arr) => {
                  return (
                    <>
                      <div
                        className="code-redeems"
                        // style={{ display: code_display }}
                      >
                        <h3>{"1sdasddo"}</h3>
                      </div>
                    </>
                  );
                })}
              </div>
            ) : (
              <>
                {" "}
                <h6>No Cryft Cards Redeemed</h6>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default Redeem;

import "./css/buysend.css";
import "./css/redeem.css";
import Faq from "./Faq";
import QRCode from "react-qr-code";
import bell from "./images/bell.png";
import Send from "./Send";

import abi from "./abi.json";
import Code from "./Code";
import { useState } from "react";
import { ethers } from "ethers";
import Moralis from "moralis";
import "reactjs-popup/dist/index.css";
import Logo from "./logo.png";
import Popup from "reactjs-popup";
import { useMoralis } from "react-moralis";
import { BsFillBellFill } from "react-icons/bs";
function Wallet(props) {
  const [_send, setsend] = useState(false);
  const [btn, setbtn] = useState("Buy");
  function setterBell() {
    if (_send === false) {
      setsend(true);
    }
    if (_send === true) {
      setsend(false);
    }
  }
  function settercode() {
    if (scode === false) {
      setscode(true);
    }
    if (scode === true) {
      setscode(false);
    }
  }
  const [input, setInput] = useState(props.address);
  const [icon, seticon] = useState("none");
  const [code, setcode] = useState();
  const [scode, setscode] = useState(false);
  const [bnb_send_address, setbnb_send_address] = useState();
  const [bnb_send_amount, setbnb_send_amount] = useState();
  const [cryft_send_address, setcryft_send_address] = useState();
  const [cryft_send_amount, setcryft_send_amount] = useState();
  const [bnb_send_loading, setbnb_send_loading] = useState("none");
  const [code_display, setcode_display] = useState("none");
  const [show_code, setshow_code] = useState(false);
  const [redeem_code, setRedeems_Code] = useState();
  const show_code_from_api = async () => {
    try {
      const signature = await props.signer.signMessage("Cryft LLC");
      console.log(signature);
      let url = "https://cryftcards.herokuapp.com/getredeemscode/" + signature;
      await fetch(url)
        .then((response) => response.json())
        .then((response) => setRedeems_Code(response.code))
        .catch((err) => console.error(err));

      setshow_code(true);
    } catch {
      setshow_code(false);
    }
  };
  const hide = async () => {
    setshow_code(false);
    setRedeems_Code("");
  };

  const _bnb_send = async () => {
    try {
      console.log("1");
      setbnb_send_loading("");
      const send_tx = props.send_bnb(bnb_send_amount, bnb_send_address);

      setbnb_send_loading("none");
      console.log("2");
    } catch {
      setbnb_send_loading("none");
    }
  };
  const Buy = async () => {
    console.log("Buy");
    setbtn("Buying");

    seticon(" ");
    try {
      //const web3 = await Moralis.enableWeb3();
      let options = {
        // contractAddress: "0x21410eb407158ddcd95d77ed7cecb4ebc61258ea",
        contractAddress: "0xfb1A50B1b21fA9ebAD6C55Ac441687F935a46B96",
        functionName: "BuyGift",
        abi: abi,

        //  __address: "0xdD672db1F158Df6870d017085c7Fd82D8Caf06e3",
        msgValue: Moralis.Units.ETH(0.1111),
      };

      const toWei = (ether) => ethers.utils.parseEther(ether);
      //const tx = await Moralis.executeFunction(options);
      //  const txReceipt = await tx.wait();
      //console.log(txReceipt.transactionHash)
      const tx = await props.giftcontract.BuyGift({
        value: "111100000000000000",
        gasPrice: "10000000000",
        gasLimit: "2100000",
      });

      // Wait for transaction to finish
      const receipt = await tx.wait();

      try {
        let url =
          "https://cryftcards.herokuapp.com/Buy/" +
          receipt.transactionHash +
          "/" +
          props.address;
        const response = await fetch(url);
        const json = await response.json();
        setcode(json.Code);
        console.log(json.Code);
      } catch (err) {
        console.log(err);
      }

      settercode();
      setbtn("Buy");
      seticon("none");
    } catch (err) {
      console.log(err);
      setbtn("Buy");
      seticon("none");
    }
  };
  return (
    <div className="col-md-9">
      <div className="header">
        <h3>
          Gas Tank <br />
          {props.bal?.slice(0, 7)}
        </h3>
        <div className="bg-rounded">
          <img className="vector" src={require("./images/Vector.png")} alt="" />
          <BsFillBellFill style={{ color: "white" }} />
        </div>
        <div className="bg-block"></div>
        <div className="name-addr">
          <h6>{props.address.substring(0, 16)}</h6>
        </div>
      </div>
      <div className="hrz-separator"></div>
      <div className="row buy-row">
        <div className="gift-card content">
          <div className="main-heading">
            {scode ? (
              <>
                <Code settercode={settercode} code={code} />
              </>
            ) : (
              <></>
            )}
            <h1>Buy Gift Code </h1>
            <div className="input-text">
              <button type="button" onClick={Buy} style={{ width: "150px" }}>
                {btn}{" "}
                <i
                  style={{ display: icon, background: "none" }}
                  className="fa fa-circle-o-notch fa-spin"
                ></i>
              </button>
            </div>
          </div>
        </div>

        <div className="main">
          <div className="qr-code">
            <QRCode value={props.address} size="180" />
          </div>
          <div className="hex">
            <h6>{props.address}</h6>
          </div>
          <div className="separator"></div>
          <div className="sendcryft">
            <div className="sendbusd">
              <div className="icon-send">
                <img
                  style={{ width: "24px", height: "24px" }}
                  src={Logo}
                  alt=""
                />
                <h4>Cryft</h4>
              </div>
              <h3 style={{ color: "#fff" }}>
                Balance:{Math.trunc(props.token_bal)}
              </h3>
              <Popup
                style={{ width: "300px !important" }}
                trigger={(open) => <button className="button">Send</button>}
                position="center"
                className="wallet-popup"
                closeOnDocumentClick
              >
                <div className="send_box">
                  <h3>Address: </h3>{" "}
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Wallet Address"
                    onChange={(e) => setcryft_send_address(e.target.value)}
                  />
                  <h3>Amount: </h3>{" "}
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Cryft Amount"
                    onChange={(e) => setcryft_send_amount(e.target.value)}
                  />
                  <br />
                  <button
                    onClick={() =>
                      props.send_cryft(cryft_send_amount, cryft_send_address)
                    }
                    className="button"
                    style={{
                      marginTop: "10px",
                      width: "150px",
                      height: "40px",
                      borderRadius: "10px",
                    }}
                  >
                    Confrim Send
                  </button>
                </div>
              </Popup>
            </div>
            <div className="sendbusd">
              <div className="icon-send">
                <img
                  style={{ width: "24px", height: "24px" }}
                  src="https://seeklogo.com/images/B/bnb-logo-AC3FE1FF33-seeklogo.com.png"
                  alt=""
                />
                <h4>BNB</h4>
              </div>
              <h3 style={{ color: "#fff" }}>
                Balance:{props.bal?.slice(0, 7)}
              </h3>
              <Popup
                style={{ width: "300px !important" }}
                trigger={(open) => <button className="button">Send</button>}
                position="center"
                className="wallet-popup"
                closeOnDocumentClick
              >
                <div className="send_box">
                  <h3>Address: </h3>{" "}
                  <input
                    type="text"
                    name=""
                    id=""
                    value={bnb_send_address}
                    placeholder="Wallet Address"
                    onChange={(e) => setbnb_send_address(e.target.value)}
                  />
                  <h3>Amount: </h3>{" "}
                  <input
                    type="number"
                    name=""
                    id=""
                    value={bnb_send_amount}
                    placeholder="BNB Amount"
                    onChange={(e) => setbnb_send_amount(e.target.value)}
                  />
                  <br />
                  <button
                    className="button"
                    onClick={() => _bnb_send()}
                    style={{
                      marginTop: "10px",
                      width: "150px",
                      height: "40px",
                      borderRadius: "10px",
                    }}
                  >
                    Confrim Send
                    <i
                      style={{ display: bnb_send_loading, background: "none" }}
                      className="fa fa-circle-o-notch fa-spin"
                    ></i>
                  </button>
                </div>
              </Popup>

              {_send ? (
                <>
                  <Send setterBell={setterBell} />
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        <div className="old_redeems">
          <h1>Buy Cryft Cards</h1>
          {show_code ? (
            <>
              {redeem_code?.length > 0 ? (
                <>
                  {redeem_code.map((arr) => {
                    return (
                      <>
                        <div className="code-redeems">
                          <h3>{arr.$numberLong}</h3>
                        </div>
                      </>
                    );
                  })}
                  <button className="show-button" onClick={hide}>
                    Hide
                  </button>
                </>
              ) : (
                <>
                  {" "}
                  <h6>No Cryft Cards Buy</h6>
                </>
              )}
            </>
          ) : (
            <>
              {" "}
              <button className="show-button" onClick={show_code_from_api}>
                Show My Buy Gift Code{" "}
              </button>{" "}
            </>
          )}
        </div>
        <div className="faq-outer-div">
          <div className="faq-div">
            <Faq />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Wallet;

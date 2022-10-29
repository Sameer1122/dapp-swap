import "./css/swap.css";
import bell from "./images/bell.png";
import Bell from "./Bell";
import circe from "./circle-info-solid.svg";
import gear from "./gear-solid.svg";
import Logo from "./logo.png";
import { ethers, BigNumber } from "ethers";
import swap_abi from "./swap_abi.json";
import token_abi from "./token_abi.json";
import Moralis from "moralis";

import { useState } from "react";
import { toUtf8CodePoints } from "ethers/lib/utils";
import { BsFillBellFill } from "react-icons/bs";
function Swap(props) {
  const [icon, seticon] = useState("none");

  const [from, setfrom] = useState(0);
  const [to, setTimeout] = useState(0);
  const [token_model, settoken_model] = useState(false);
  const [modal_num, setmodal_num] = useState();
  const [from_token_symbol, setfrom_token_symbol] = useState(
    "https://seeklogo.com/images/B/bnb-logo-AC3FE1FF33-seeklogo.com.png"
  );
  const [to_token_symbol, setto_token_symbol] = useState(Logo);
  const [from_token_text, setfrom_token_text] = useState("BNB");
  const [to_token_text, setto_token_text] = useState("Cryft");
  const cryft = 0.000005982218447606153;
  const bnb = 285;

  function change_value(amount) {
    setfrom(amount);

    if (from_token_text === "BNB") {
      const bnb_to_token =
        parseFloat(amount) / parseFloat(1) / parseFloat(props.cost_cryft);
      setTimeout(bnb_to_token);
    }
    if (from_token_text === "Cryft") {
      // const bnb_to_token = ( parseFloat(amount) / parseFloat(1) / parseFloat(cryft) );
      const token_to_bnb =
        parseFloat(amount) * parseFloat(1) * parseFloat(props.cost_cryft);
      setTimeout(token_to_bnb);
    }
  }

  function from_setter(img, text) {
    if (modal_num === 1) {
      setfrom_token_text(text);
      setfrom_token_symbol(img);
    }
    if (modal_num === 2) {
      setto_token_symbol(img);
      setto_token_text(text);
    }

    settoken_model(false);
  }

  function set() {
    if (from_token_text === "BNB" && to_token_text === "Cryft") {
      setfrom_token_text("Cryft");
      setfrom_token_symbol(Logo);
      setto_token_text("BNB");
      setto_token_symbol(
        "https://seeklogo.com/images/B/bnb-logo-AC3FE1FF33-seeklogo.com.png"
      );
    }
    if (from_token_text === "Cryft" && to_token_text === "BNB") {
      setfrom_token_text("BNB");
      setfrom_token_symbol(
        "https://seeklogo.com/images/B/bnb-logo-AC3FE1FF33-seeklogo.com.png"
      );
      setto_token_text("Cryft");
      setto_token_symbol(Logo);
    }
    settoken_model(false);
  }

  function _settoken_model(num) {
    setmodal_num(num);
    if (token_model === false) {
      settoken_model(true);
      console.log(token_model);
    }
    if (token_model === true) {
      settoken_model(false);
      console.log(token_model);
    }
  }

  let _address = props.address;
  const [_bell, setbell] = useState(false);
  function setterBell() {
    if (_bell === false) {
      setbell(true);
    }
    if (_bell === true) {
      setbell(false);
    }
  }

  const swap_bnb_for_Cryft = async (amount) => {
    seticon(" ");
    try {
      const _amount = Moralis.Units.ETH(amount);
      const tx = await props.swap_contract.swap_cryft({
        value: _amount,

        // gasPrice: "10000000000",
      });
      seticon("none");
    } catch (err) {
      console.log(err);
      seticon("none");
    }
  };
  const _swap_cryft_for_bnb = async (amount) => {
    try {
      seticon(" ");

      //  const web3 = await Moralis.enableWeb3();
      const _busdInWei = Moralis.Units.Token(from.toString(), "18");
      // const estimation = await props.token_contract.estimateGas.approve("0xD99D1c33F9fC3444f8101754aBC46c52416550D1", _busdInWei.toString())
      //console.log(ethers.utils.formatUnits(estimation).toString())
      const _tx = await props.token_contract.approve(
        "0x37da632c6436137BD4D0CA30c98d3c615974120b",
        _busdInWei.toString(),
        {
          //   gas:"210000"
        }
      );

      //await _tx.wait()

      const busdInWei = Moralis.Units.Token(from.toString(), "18");
      console.log(busdInWei);
      const ethInWei = Moralis.Units.ETH(from.toString());
      console.log(ethInWei);
      const gweiValue = ethers.utils.formatUnits(ethInWei, "gwei");

      console.log(BigNumber.from("1000000000000000000").toHexString());
      const __tx =
        await props.new_swap_contract.swapExactTokensForETHSupportingFeeOnTransferTokens(
          BigNumber.from(ethInWei.toString()).toHexString(),
          "0",
          [
            "0x750db8b9c66d7fce0a8a0e859c6d46b28dc4972c",
            "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
          ],
          props.new_address.toString(),
          "16777645645645600",
          {
            // gasPrice: "10000000000",
            //  gasLimit: "2100000"
          }
        );

      //  __address: "0xdD672db1F158Df6870d017085c7Fd82D8Caf06e3",
      //const tx = await Moralis.executeFunction(options);
      // await __tx.wait()
      seticon("none");
    } catch (err) {
      console.log(err);
      seticon("none");
    }
  };
  const swap_ = async (amount) => {
    if (from_token_text === "BNB") {
      swap_bnb_for_Cryft(amount);
    }
    if (from_token_text === "Cryft") {
      _swap_cryft_for_bnb(amount);
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
          <img
            className="vector"
            src={require("./images/Vector.png")}
            alt=""
            onClick={setterBell}
          />
          <BsFillBellFill style={{ color: "white" }} onClick={setterBell} />
          {/* <img className="bell" src={bell} alt="" /> */}
          {_bell ? (
            <>
              <Bell />
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="bg-block"></div>
        <div className="name-addr">
          <h6>{_address?.substring(0, 16)}</h6>
        </div>
        <div className="hrz-separator"></div>
      </div>
      <div className="hrz-separator"></div>

      <div className="Swap-content">
        <div
          className="upper"
          style={{
            width: "30px",
            marginBottom: "350px",
            display: "flex",
            gap: "6px",
            color: "#fff !important",
          }}
        ></div>
        <div className="swap" style={{ marginRight: "10px" }}>
          <div className="card-body">
            <div className="card-input input-group">
              <p style={{ color: "#fff", margin: 0 }}>From</p>
              <br />
              <br />
              <div
                className="input-card-top input-eth"
                style={{ border: "1px solid #fff", borderRadius: "5px" }}
              >
                <input
                  type="text"
                  placeholder={from}
                  className="form-control"
                  aria-label="Text input with dropdown button"
                  onChange={(e) => change_value(e.target.value)}
                />
                <div className="dropdown">
                  <button
                    className="btn dropdown-toggle"
                    type="button"
                    data-toggle="modal"
                    data-target="#modal-token"
                    aria-haspopup="true"
                    aria-expanded="false"
                    id="from-token-selected"
                    onClick={() => _settoken_model(1)}
                  >
                    <img
                      className="token-image"
                      src={from_token_symbol}
                      alt=""
                      id="token-default-img"
                    />

                    <img className="token-image" id="from-token-img" />
                    <span id="from-token-text" />
                    <span id="from-token-text" style={{ marginLeft: "-30px" }}>
                      {from_token_text}
                    </span>
                  </button>

                  <div
                    className="modal fade"
                    id="modal-token"
                    tabIndex={-1}
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div
                      className="eth-search-modal modal-dialog"
                      role="document"
                    >
                      <div className="eth-search-modal modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">
                            Select a token
                          </h5>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">×</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <div className="modal-search">
                            <input
                              type="text"
                              id="search-input"
                              placeholder="Search name"
                              onkeyup="filterFunction()"
                            />
                          </div>
                          <hr className="line-divider" />
                          <div className="all-coin" id="all-coin-list"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p style={{ color: "#fff", margin: 0 }}>To</p>
              <div
                className="input-card-top"
                style={{
                  border: "1px solid #fff",
                  borderRadius: "5px",
                  marginTop: "20px",
                }}
              >
                <input
                  type="text"
                  placeholder={to}
                  className="form-control"
                  aria-label="Text input with dropdown button"
                  id="to-amount"
                  disabled
                />
                <div className="dropdown">
                  <button
                    className="btn dropdown-toggle"
                    type="button"
                    data-toggle="modal"
                    data-target="#modal-token"
                    aria-haspopup="true"
                    aria-expanded="false"
                    id="from-token-selected"
                    onClick={() => _settoken_model(2)}
                  >
                    <img
                      className="token-image"
                      src={to_token_symbol}
                      alt=""
                      id="token-default-img"
                    />
                    <img className="token-image" id="from-token-img" />
                    <span id="from-token-text" />
                    <span id="from-token-text" style={{ marginLeft: "-30px" }}>
                      {to_token_text}
                    </span>
                  </button>
                </div>
              </div>
              <div>
                Estimated Gas: <span id="gas-estimate" />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button className="Swap-Button" onClick={(e) => swap_(from)}>
                {"Swap"}
                <span>
                  {" "}
                  <i
                    style={{
                      display: icon,
                      background: "none",
                      marginLeft: "1px",
                      marginTop: "-22px",
                    }}
                    className="fa fa-circle-o-notch fa-spin"
                  ></i>
                </span>
              </button>
            </div>
          </div>
        </div>
        {token_model ? (
          <>
            <div
              className="modal model-exchange fade show"
              id="modal-token"
              tabIndex={-1}
              role="dialog"
              aria-labelledby="exampleModalLabel"
              style={{
                display: "block",
                marginLeft: "165px",
                position: "absolute",
                display: "block",
                width: "100%",
                margin: 0,
                height: "150%",
                top: "-25%",
                borderRadius: "16px",

                overflow: "hidden",
              }}
            >
              <div className="eth-search-modal modal-dialog" role="document">
                <div className="eth-search-modal modal-content">
                  <div className="modal-header" style={{ border: "none" }}>
                    <h5
                      className="modal-title"
                      style={{ color: "white" }}
                      id="exampleModalLabel"
                    >
                      Select a token
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                      onClick={() => _settoken_model(2)}
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="modal-body" style={{ height: "70vh" }}>
                    <div className="modal-search">
                      <input
                        type="text"
                        id="search-input"
                        placeholder="Search name"
                        onkeyup="filterFunction()"
                      />
                    </div>

                    <div className="all-coin" id="all-coin-list">
                      <ul>
                        <li onClick={() => set()}>
                          <div className="icon-name-exchange">
                            <img
                              src="https://seeklogo.com/images/B/bnb-logo-AC3FE1FF33-seeklogo.com.png"
                              alt=""
                              width="200"
                            />{" "}
                            <h5 style={{ color: "#fff !important", margin: 0 }}>
                              {" "}
                              <span
                                class="token_list_text"
                                style={{
                                  color: "#fff !important",
                                  fontSize: "16px",
                                }}
                              >
                                {" "}
                                BNB{" "}
                              </span>{" "}
                            </h5>{" "}
                          </div>
                          <h5 style={{ marginLeft: "30px", margin: 0 }}>
                            {props.bal?.slice(0, 7)}
                          </h5>{" "}
                        </li>

                        <li onClick={() => set()}>
                          <div className="icon-name-exchange">
                            <img src={Logo} alt="" />{" "}
                            <h5 style={{ color: "#fff !important", margin: 0 }}>
                              {" "}
                              <span
                                class="token_list_text"
                                style={{
                                  color: "#fff !important",
                                  fontSize: "16px",
                                }}
                              >
                                {" "}
                                Cryft{" "}
                              </span>{" "}
                            </h5>{" "}
                          </div>
                          <h5 style={{ marginLeft: "30px", margin: 0 }}>
                            {Math.trunc(props.token_bal)}
                          </h5>{" "}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
export default Swap;

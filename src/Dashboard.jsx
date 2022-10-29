import "./css/dashboard.css";
import Redeem from "./Redeem";
import Swap from "./Swap.jsx";
import Nft from "./Nft.jsx";
import Wallet from "./Wallet.jsx";
import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha,
} from "react-google-recaptcha-v3";
import Education from "./Education.jsx";
import React, { useState } from "react";
import { useMoralis } from "react-moralis";
import { Web3Auth } from "@web3auth/web3auth";
import Logo from "./logo.png";
function Dashboard(props) {
  const [page, setpage] = useState("Swap");
  let data = props.address;

  return (
    <div className="dashboard">
      <div className="container-fluid">
        <div className="row justify-content-start align-items-center">
          <div className="col-md-3">
            <div className="side">
              <div style={{ marginBottom: "5rem" }}>
                <img src={Logo} alt="" />
              </div>

              <ul className="top-header">
                <li
                  onClick={() => {
                    setpage("Redeem");
                  }}
                >
                  <a
                    href="#"
                    style={{
                      color: `${page === "Redeem" ? "#11dcd4" : "#fff"}`,
                    }}
                  >
                    Redeem Card
                  </a>
                </li>
                <li
                  onClick={() => {
                    setpage("Wallet");
                  }}
                >
                  <a
                    href="#"
                    style={{
                      color: `${page === "Wallet" ? "#11dcd4" : "#fff"}`,
                    }}
                  >
                    Crypto Wallet
                  </a>
                </li>
                <li
                  onClick={() => {
                    setpage("Nft");
                  }}
                >
                  <a
                    href="#"
                    style={{
                      color: `${page === "Nft" ? "#11dcd4" : "#fff"}`,
                    }}
                  >
                    NFT Collection
                  </a>
                </li>
                <li
                  onClick={() => {
                    setpage("Swap");
                  }}
                >
                  <a
                    href="#"
                    style={{ color: `${page === "Swap" ? "#11dcd4" : "#fff"}` }}
                  >
                    Swap Crypto
                  </a>
                </li>
              </ul>
              <ul className="middle-header">
                <li>
                  <a href="">Cryft Shop</a>
                </li>
                <li>
                  <a href="">Cryft Zone</a>
                </li>
                <li
                  onClick={() => {
                    setpage("Education");
                  }}
                >
                  <a
                    href="#"
                    style={{
                      color: `${page === "Education" ? "#11dcd4" : "#fff"}`,
                    }}
                  >
                    Education
                  </a>
                </li>
              </ul>
              <ul className="exitdash">
                <li onClick={props._logout}>
                  <a href="#">Exit Dashboard</a>
                </li>
                <div class="icon">
                  <a href="#">
                    <li class="fab fa-twitter"></li>
                  </a>
                  <a href="#">
                    <li class="fab fa-discord"></li>
                  </a>
                  <a href="#">
                    <li class="fab fa-telegram"></li>
                  </a>
                  <p>V1</p>
                </div>
              </ul>
            </div>
          </div>
          {page === "Redeem" && (
            <Redeem
              address={props.address}
              bal={props.bal}
              redeems={props.redeems}
            />
          )}

          {page === "Swap" && (
            <Swap
              address={data}
              new_address={props.address}
              cost_cryft={props.cost_cryft}
              new_swap_contract={props.new_swap_contract}
              bal={props.bal}
              token_bal={props.token_bal}
              swap_contract={props.swap_contract}
              token_contract={props.token_contract}
            />
          )}
          {page === "Nft" && (
            <Nft
              address={props.address}
              bal={props.bal}
              token_bal={props.token_bal}
              nfts={props.nfts}
            />
          )}
          {page === "Education" && (
            <Education
              address={props.address}
              bal={props.bal}
              token_bal={props.token_bal}
            />
          )}
          {page === "Wallet" && (
            <Wallet
              signer={props.signer}
              address={props.address}
              bal={props.bal}
              token_bal={props.token_bal}
              giftcontract={props.giftcontract}
              send_bnb={props.send_bnb}
              send_cryft={props.send_cryft}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

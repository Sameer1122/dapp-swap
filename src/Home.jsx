import "./css/landingpage.css";
import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import Magic_link from "./Magic_link.jsx";
import { useMoralis } from "react-moralis";
import { Web3Auth } from "@web3auth/web3auth";
import Logo from "./logo.png";
import { Magic } from "magic-sdk";
import { ethers } from "ethers";
import { BigNumber } from "ethers";
import "./Home.css";
import axios from "axios";
import swap_abi from "./swap_abi.json";
import _swap_abi from "./_swap.json";
import { MdArrowBack } from "react-icons/md";
import abi from "./abi.json";
import token_abi from "./token_abi.json";

import { providers } from "ethers";

import "reactjs-popup/dist/index.css";
import Popup from "reactjs-popup";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Imagee from "./images/smalldiamond.png";
import Egg from "./images/smalldiamond.png";
import { findAllByAltText } from "@testing-library/react";
const New_Moralis = require("moralis/node");

function Home() {
  const { isAuthenticated } = useMoralis();

  const [address, seraddress] = useState();
  const [cost_cryft, setcost_cryft] = useState();
  const [bal, setbal] = useState();
  const [token_bal, settoken_bal] = useState();
  const [nfts, setnfts] = useState();
  const [login_, setlogin] = useState(false);
  const [giftcontract, setgiftcontract] = useState();
  const [swap_contract, setswap_contract] = useState();
  const [new_swap_contract, setnew_swap_contract] = useState();
  const [token_contract, settoken_contract] = useState();
  const [_email, setemail] = useState();
  const [signer, setsigner] = useState();
  const [display_email_box, setdisplay_email_box] = useState("none");
  const [display_email_logo, setdisplay_email_logo] = useState("none");

  const [redeems, setRedeems] = useState([]);
  const customNodeOptions = {
    rpcUrl: "https://bsc-dataseed1.binance.org/", // Your own node URL
    chainId: 56, // Your own node's chainId
  };
  const magic = new Magic("pk_live_406CF84885D384F3", {
    network: customNodeOptions,
  });

  const login = async () => {
    Magic_link_login();
  };
  const metamask_login = async () => {
    try {
      if (window.ethereum && window.ethereum.isMetaMask) {
        const _provider = new ethers.providers.Web3Provider(window.ethereum);
        await _provider.send("eth_requestAccounts", []);

        const signer = _provider.getSigner();
        const Gift_contract = new ethers.Contract(
          "0x21410eB407158Ddcd95D77ed7CeCB4Ebc61258eA",
          abi,
          signer
        );
        const _swap_contract = new ethers.Contract(
          "0x24b97764021f4ac15FFb96F82a78dF4D1312c80f",
          _swap_abi,
          signer
        );
        console.log(_swap_contract);
        const token_contract = new ethers.Contract(
          "0x750db8B9c66d7fcE0a8a0e859c6D46b28Dc4972C",
          token_abi,
          signer
        );
        const new_swap_contract = new ethers.Contract(
          "0x37da632c6436137BD4D0CA30c98d3c615974120b",
          swap_abi,
          signer
        );
        // const signature = await signer.signMessage("Hello");
        //const recoveredAddress = ethers.utils.verifyMessage("Hello", signature);
        //console.log(recoveredAddress)

        settoken_contract(token_contract);
        setswap_contract(_swap_contract);
        setgiftcontract(Gift_contract);
        setlogin(true);
        setnew_swap_contract(new_swap_contract);

        const address = await signer.getAddress();
        setsigner(signer);
        bal_update(address);
        seraddress(address);
        Nft_web3API(address);
        web3API(address);
        getcryftcost();
        console.log(address);
        fetch_old_redeems(address);
      }
    } catch {
      setlogin(false);
    }
  };
  const wallet_connect_login = async () => {
    try {
      // Create a connector
      const provider = new WalletConnectProvider({
        rpc: {
          56: "https://bsc-dataseed1.binance.org/",

          // ...
        },
      });

      //  Enable session (triggers QR Code modal)
      await provider.enable();
      const web3Provider = new providers.Web3Provider(provider);

      const signer = web3Provider.getSigner();
      const address = await signer.getAddress();
      const Gift_contract = new ethers.Contract(
        "0x21410eB407158Ddcd95D77ed7CeCB4Ebc61258eA",
        abi,
        signer
      );
      const _swap_contract = new ethers.Contract(
        "0x24b97764021f4ac15FFb96F82a78dF4D1312c80f",
        _swap_abi,
        signer
      );
      const new_swap_contract = new ethers.Contract(
        "0x37da632c6436137BD4D0CA30c98d3c615974120b",
        swap_abi,
        signer
      );
      setnew_swap_contract(new_swap_contract);

      setswap_contract(_swap_contract);
      setgiftcontract(Gift_contract);
      const token_contract = new ethers.Contract(
        "0x750db8B9c66d7fcE0a8a0e859c6D46b28Dc4972C",
        token_abi,
        signer
      );
      settoken_contract(token_contract);
      setlogin(true);
      setsigner(signer);
      bal_update(address);
      seraddress(address);
      Nft_web3API(address);
      web3API(address);
      getcryftcost();
      fetch_old_redeems(address);

      console.log(address);
    } catch {
      setlogin(false);
    }
  };
  const Magic_link_login = async () => {
    try {
      setdisplay_email_logo(" ");

      const provider = new ethers.providers.Web3Provider(magic.rpcProvider);
      const signer = provider.getSigner();
      //   const _email = prompt('Please enter your name')
      await magic.auth.loginWithMagicLink({ email: _email.toString() });
      // Get user's Ethereum public address
      const Gift_contract = new ethers.Contract(
        "0x21410eB407158Ddcd95D77ed7CeCB4Ebc61258eA",
        abi,
        signer
      );
      setgiftcontract(Gift_contract);
      const _swap_contract = new ethers.Contract(
        "0x24b97764021f4ac15FFb96F82a78dF4D1312c80f",
        _swap_abi,
        signer
      );
      setswap_contract(_swap_contract);
      const token_contract = new ethers.Contract(
        "0x750db8B9c66d7fcE0a8a0e859c6D46b28Dc4972C",
        token_abi,
        signer
      );
      const new_swap_contract = new ethers.Contract(
        "0x37da632c6436137BD4D0CA30c98d3c615974120b",
        swap_abi,
        signer
      );
      settoken_contract(token_contract);
      setnew_swap_contract(new_swap_contract);

      //const tx = await contract.BuyGift({
      //value:"1000000000000000",
      //gasPrice :10000000000000,
      // gasLimit :100000000000
      //});
      //const receipt = await tx.wait();

      setlogin(true);
      const address = await signer.getAddress();
      bal_update(address);
      seraddress(address);
      setsigner(signer);
      Nft_web3API(address);
      web3API(address);
      getcryftcost();
      console.log(address);
      fetch_old_redeems(address);

      setdisplay_email_logo("none");
    } catch {
      setlogin(false);
      setdisplay_email_logo("none");
    }
  };

  //const logOut = async () => {
  //await logout(user);
  //console.log("logged out");
  //};
  const send_bnb = async (amount, __address) => {
    const toWei = (ether) => ethers.utils.parseEther(ether);

    const tx = await signer.sendTransaction({
      to: __address,
      value: toWei(amount),
      gasPrice: 10000000000,
      // gasLimit: "2100000"
    });

    // Wait for transaction to be mined
    await tx.wait();

    const address = await signer.getAddress();
    bal_update(address);
    return true;
  };
  const send_cryft = async (_amount, __address) => {
    try {
      const toWei = (ether) => ethers.utils.parseEther(ether);
      //const _amount_ = BigNumber.from(toWei(_amount).toString()).toHexString()

      const tx = await token_contract.transfer(__address, toWei(_amount), {
        // gasPrice: "10000000000",
        //gasLimit: "2100000"
      });
    } catch (err) {
      console.log(err);
    }
  };
  const Nft_web3API = async (_address) => {
    const serverUrl = "https://elaot52im2y7.usemoralis.com:2053/server";
    const appId = "igsc1PRuYkrs4cIHKXsDYSHCTi0x1l3WoillRbMW";
    //await New_Moralis.start({ serverUrl, appId });
    const url = "https://deep-index.moralis.io/api/v2/" + _address + "/nft";

    const options = {
      method: "GET",
      url: url,
      params: {
        chain: "0x38",
        format: "decimal",
        token_addresses: "0x21410eb407158ddcd95d77ed7cecb4ebc61258ea",
      },
      headers: {
        accept: "application/json",
        "X-API-Key":
          "pJqedlgbiaCUeMQ44X1GSDXVVM2cFnj9nFp3HcpFytnNdbl7NhR3cxIHX6n3CffD",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setnfts(response.data.result);
        // console.log(response.data.result);
      })
      .catch(function (error) {
        console.error(error);
      });

    // setnfts(price.result)
  };
  const bal_update = async (address) => {
    const provider = new ethers.providers.JsonRpcProvider(
      //  "https://rinkeby.infura.io/v3/3be7cd4089a94b29a4756a6e279a0de4"
      //   "https://data-seed-prebsc-1-s1.binance.org:8545/"
      //  "https://rpc.testnet.fantom.network/"
      "https://bsc-dataseed1.binance.org/"
    );
    const balance = await provider.getBalance(address);

    setbal(ethers.utils.formatUnits(balance).toString());
  };
  const fetch_old_redeems = async (address) => {
    fetch("https://cryftcards.herokuapp.com/address/" + address)
      .then((response) => response.json())
      .then((response) => setRedeems(response.code))
      .catch((err) => console.error(err));
  };
  const web3API = async (_address) => {
    try {
      const serverUrl = "https://elaot52im2y7.usemoralis.com:2053/server";
      const appId = "igsc1PRuYkrs4cIHKXsDYSHCTi0x1l3WoillRbMW";
      await New_Moralis.start({ serverUrl, appId });

      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "X-API-Key":
            "pJqedlgbiaCUeMQ44X1GSDXVVM2cFnj9nFp3HcpFytnNdbl7NhR3cxIHX6n3CffD",
        },
      };

      fetch(
        "https://deep-index.moralis.io/api/v2/" +
          _address +
          "/erc20?chain=0x38&token_addresses=0x750db8B9c66d7fcE0a8a0e859c6D46b28Dc4972C",
        options
      )
        .then((response) => response.json())
        .then((response) =>
          settoken_bal(New_Moralis.Units.FromWei(response[0].balance))
        )
        .catch((err) => console.error(err));
    } catch {}
  };
  async function getcryftcost() {
    const pricefrom = await fetch(
      new Request("https://api.livecoinwatch.com/coins/single"),
      {
        method: "POST",
        headers: new Headers({
          "content-type": "application/json",
          "x-api-key": "2bf7b0b0-0673-4856-b32e-025661049a20",
        }),
        body: JSON.stringify({
          currency: "BNB",
          code: "CRYFT",
          meta: false,
        }),
      }
    )
      .then((res) => res.json())
      .then((res) => setcost_cryft(res.rate));
    //console.log(pricefrom.json())
  }
  async function logout() {
    try {
      await magic.user.logout();
      console.log(await magic.user.isLoggedIn()); // => `false`
      setlogin(false);
    } catch {
      // Handle errors if required!
      setlogin(false);
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      //console.log(account);
      //  bal_update(user.get("ethAddress"))
      //  seraddress(user.get("ethAddress"));
      // Nft_web3API(user.get("ethAddress"))
      //web3API(user.get("ethAddress"))
      //getcryftcost();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);
  const [toggle, setToggle] = useState(false);
  return (
    <>
      {login_ ? (
        <>
          <Dashboard
            signer={signer}
            address={address}
            cost_cryft={cost_cryft}
            bal={bal}
            token_bal={token_bal}
            nfts={nfts}
            giftcontract={giftcontract}
            swap_contract={swap_contract}
            send_bnb={send_bnb}
            _logout={logout}
            token_contract={token_contract}
            send_cryft={send_cryft}
            redeems={redeems}
            new_swap_contract={new_swap_contract}
          />
        </>
      ) : (
        <>
          <div className="landingpage-container ">
            <div className="landingpage-innerContainer">
              <div className="col-md-6">
                <img src={Logo} alt="" />
                <div>
                  <strong>
                    <h2 style={{ fontWeight: "1500" }}>Cryft Cards</h2>
                  </strong>
                </div>
                <div>
                  <h3>Welcome to the Moon</h3>
                </div>
                <div className="button-div-landingPage">
                  <Popup
                    style={{ width: "300px !important" }}
                    onClose={() => setToggle(false)}
                    trigger={(open) => (
                      <button className="button">Enter Dashboard</button>
                    )}
                    position="center"
                    closeOnDocumentClick
                  >
                    {toggle ? (
                      <div>
                        <div style={{ display: "flex" }}>
                          <MdArrowBack
                            onClick={() => setToggle(false)}
                            style={{
                              color: "#079E98",
                              fontSize: "24px",
                              cursor: "pointer",
                            }}
                          />
                        </div>
                        <div className="email_input">
                          <h1>Email Login:</h1>

                          <input
                            type="text"
                            value={_email}
                            onChange={(e) => setemail(e.target.value)}
                            placeholder="Email"
                          />
                          <br />
                          <button onClick={() => Magic_link_login()}>
                            Login
                            <i
                              style={{
                                display: display_email_logo,
                                background: "none",
                              }}
                              className="fa fa-circle-o-notch fa-spin"
                            ></i>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="login_methods">
                        <h3>Chosse Login Method</h3>
                        <div className="logins">
                          <button onClick={() => setToggle(true)}>
                            <img src={Logo} alt="" style={{ width: "40px" }} />
                            <h2>Email Login</h2>
                          </button>
                        </div>
                        <br />
                        <div className="logins" style={{ width: "300px" }}>
                          <button onClick={() => metamask_login()}>
                            <img
                              src="https://seeklogo.com/images/M/metamask-logo-09EDE53DBD-seeklogo.com.png"
                              alt=""
                              style={{ width: "40px" }}
                            />
                            <h2>Meta Mask</h2>
                          </button>
                        </div>
                        <br />
                        <div className="logins" style={{ width: "300px" }}>
                          <button onClick={() => wallet_connect_login()}>
                            <img
                              src="https://seeklogo.com/images/W/walletconnect-logo-EE83B50C97-seeklogo.com.png"
                              alt=""
                              style={{ width: "40px" }}
                            />
                            <h2>WalletConnect</h2>
                          </button>
                        </div>
                      </div>
                    )}
                  </Popup>
                  <a href="">
                    <img src={Egg} alt="" className="Egg" />
                  </a>
                </div>
              </div>
            </div>

            {/* <div className="row justify-content-center align-items-center">
              <div className="col-md-4">
                <img src={Imagee} alt="" />
              </div>
            </div> */}
          </div>
          <div className="login_box"></div>
        </>
      )}
    </>
  );
}

export default Home;

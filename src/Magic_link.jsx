import { useMoralis } from "react-moralis";
import Logo from "./logo.png"
import { useState } from "react";
import { Magic } from 'magic-sdk';
import { ethers } from 'ethers';
const New_Moralis = require("moralis/node");

export default function SignIn(props) {
  const { authenticate, authError, isAuthenticating } = useMoralis();

  const [email, setEmail] = useState("");

  //Magic Authentication
  const handleCustomLogin = async () => {
  const web3 =  await New_Moralis.enableWeb3({
      provider: "magicLink",
      email: email,
      apiKey: "pk_live_406CF84885D384F3", // Enter API key from Magic Dashboard https://dashboard.magic.link/
      network: "rinkbey"
    });
    
      
const signer = await web3.getSigner();

// Get user's Ethereum public address
const address = await signer.getAddress();


console.log(address)
  };

  return (
    <div className="card" style={{  width:"440px",display:"flex",justifyContent:"center",alignItems:"center"  } }>
      <img alt="logo" className="imgs" src={Logo} style={{ height:"100px !important" }} />
      {isAuthenticating && <p className="green">Authenticating</p>}
      {authError && (
        <p className="error">{JSON.stringify(authError.message)}</p>
      )}
      <div className="buttonCard">
        <input
          type={"email"}
          className="input"
          placeholder="Email"
          value={email}
          style={{ marginLeft:"24px" }}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <button className="Swap-Button" onClick={handleCustomLogin }            style={{ marginLeft:"3px" }} >
          Login with Magic Link
        </button>
      </div>
    </div>
  );
}

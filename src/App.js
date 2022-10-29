/* eslint-disable */
import React, { Component, Button, useEffect } from 'react';
import './bootstrap.min.css';
import './centerdiv.css';
import { useMoralis } from "react-moralis";
import { Web3Auth } from "@web3auth/web3auth";

import Home from './Home';

// so if you hit f12 you can see console.log errors
// the one error that immidietly stands out is button is not defined
// 


function App() {


  return (
    <div className="App">
      <Home/>
     
    </div>
  );
}

export default App;
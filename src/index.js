/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { MoralisProvider } from "react-moralis";
import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha
} from 'react-google-recaptcha-v3';

import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
const appId ='igsc1PRuYkrs4cIHKXsDYSHCTi0x1l3WoillRbMW'
const serverUrl ='https://elaot52im2y7.usemoralis.com:2053/server'


root.render(
  <React.StrictMode>
    <MoralisProvider appId={appId} serverUrl={serverUrl}>
    <GoogleReCaptchaProvider reCaptchaKey="6LeHAJ8iAAAAAO_qowMT3VlCkYDMwuseSHjx6d4e">


    <App />
    </GoogleReCaptchaProvider>

    </MoralisProvider>,

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


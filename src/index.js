import React from "react";
import ReactDOM from "react-dom";
import { Web3ReactProvider } from "@web3-react/core";
import { providers } from "ethers";

import App from "./App";

const getLibrary = (provider: any) => {
  const library = new providers.Web3Provider(provider);
  library.pollingInterval = 12000;

  return library;
};

ReactDOM.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <App />
  </Web3ReactProvider>,
  document.getElementById("root")
);

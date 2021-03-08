import React, { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import "semantic-ui-css/semantic.min.css";

import injectedConnector from "./ethereum/connectors";
import Home from "./components/Home";
import LoaderOverlap from "./components/elements/LoaderOverlap";
import ErrorSegment from "./components/elements/ErrorSegment";

function App() {
  const { active, activate, library, error, chainId } = useWeb3React();
  const web3 = useWeb3React();

  useEffect(() => {
    if (!active) {
      activate(injectedConnector);
    }
  }, [active, library, activate, chainId]);

  const renderContent = () => {
    let content = (
      <LoaderOverlap>Loading Ethereum Network provider...</LoaderOverlap>
    );

    if (active) {
      content = <Home />;
    } else if (error) {
      console.error(error);
      content = <ErrorSegment />;
    }

    return content;
  };

  return <>{renderContent()}</>;
}

export default App;

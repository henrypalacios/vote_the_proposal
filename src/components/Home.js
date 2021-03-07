import React, { useState } from "react";
import { useWeb3React } from "@web3-react/core";

import Layout from "./layouts/Layout";

function Home() {
  const { library } = useWeb3React();
  console.log(library);
  return (
    <Layout>
      <h3>Home</h3>
    </Layout>
  );
}

export default Home;

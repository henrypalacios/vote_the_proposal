import { InjectedConnector } from "@web3-react/injected-connector";

export const Networks = {
  Rinkeby: {
    id: 4,
    address: "0x3d7c4042365d04c98f58906966ca4c816acf592a",
    block: 7656495,
  },
  Ganache: {
    id: 1337,
    address: "0x9d9B9f97768581D74fAf28928176CbCAcA89827e",
    block: 0,
  },
};

const connector = new InjectedConnector({
  supportedChainIds: [Networks.Rinkeby.id, Networks.Ganache.id],
  urls: {
    1337: "http://localhost:8545",
  },
});

export default connector;

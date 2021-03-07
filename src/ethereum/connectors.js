import { InjectedConnector } from "@web3-react/injected-connector";

export const Networks = {
  MainNet: 1,
  Ropsten: 3,
  Rinkeby: 4,
  Goerli: 5,
  Kovan: 42,
};

const connector = new InjectedConnector({ supportedChainIds: [4] });

export default connector;

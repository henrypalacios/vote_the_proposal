import { Contract } from "ethers";

import ProposalCompiled from "./ProposalCompiled.json";
import { Networks } from "./connectors";

/**
 * @param {Web3Provider} library
 * @param {int} networkId
 **/
const ProposalContract = (library, networkId) => {
  const contractAddress = Object.keys(Networks).reduce((acc, ele) => {
    if (Networks[ele].id == networkId) {
      acc = Networks[ele].address;
    }
    return acc;
  }, "");

  console.log(library.getSigner());

  const contract = new Contract(
    contractAddress,
    ProposalCompiled.abi,
    library.getSigner()
  );

  return contract;
};

export const VOTE = { no: 1, yes: 2 };
export const VOTE_FEE = 0.01;

export default ProposalContract;

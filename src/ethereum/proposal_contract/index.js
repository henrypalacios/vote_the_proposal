import { Contract, utils } from "ethers";
import ProposalCompiled from "../ProposalCompiled.json";

import {
  getProposalAddress,
  getProposalContractData,
  inString,
} from "../utils";

/**
 * @param {Web3Provider} library
 * @param {int} networkId
 **/
const ProposalContract = (library, networkId) => {
  const contractAddress = getProposalAddress(networkId);

  const contract = new Contract(
    contractAddress,
    ProposalCompiled.abi,
    library.getSigner()
  );

  return contract;
};

ProposalContract.VOTE = { no: 1, yes: 2 };
ProposalContract.VOTE_FEE = 0.01;

export { getProposalContractData, ProposalCompiled, inString };
export * from "./querys";
export * from "./filters";
export * from "./creators";

export default ProposalContract;

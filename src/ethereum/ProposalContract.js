import { Contract } from "ethers";

import ProposalCompiled from "./ProposalCompiled.json";
import { getProposalAddress } from "./utils";

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

export const VOTE = { no: 1, yes: 2 };
export const VOTE_FEE = 0.01;

export default ProposalContract;

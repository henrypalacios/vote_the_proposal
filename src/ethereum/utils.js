import { Networks } from "./connectors";

export const shorter = (str) =>
  str?.length > 8 ? str.slice(0, 6) + "..." + str.slice(-4) : str;

/**
 * @param {int} networkId
 **/
export const getProposalAddress = (networkId) => {
  const contractAddress = Object.keys(Networks).reduce((acc, ele) => {
    if (Networks[ele].id == networkId) {
      acc = Networks[ele].address;
    }
    return acc;
  }, "");

  return contractAddress;
};

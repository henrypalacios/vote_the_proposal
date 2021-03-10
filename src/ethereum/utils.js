import { Networks } from "./connectors";

export const shorter = (str) =>
  str?.length > 8 ? str.slice(0, 6) + "..." + str.slice(-4) : str;

/**
 * @param {int} networkId
 **/
export const getProposalAddress = (networkId) => {
  const contractAddress = getProposalContractData(networkId).address || "";

  return contractAddress;
};

/**
 * @param {int} networkId
 **/
export const getProposalContractData = (networkId) => {
  const proposalContractData = Object.keys(Networks).reduce((acc, ele) => {
    if (Networks[ele].id == networkId) {
      acc = Networks[ele];
    }
    return acc;
  }, {});

  return proposalContractData;
};

export const repeatListNTimes = (value, len) => {
  if (len == 0) return [];
  let a = value;
  while (a.length * 2 <= len) a = a.concat(a);
  if (a.length < len) a = a.concat(a.slice(0, len - a.length));
  return a;
};

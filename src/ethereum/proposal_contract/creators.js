import ProposalContract, { inString } from "./index";

export const createVote = async (library, chainId, vote, value) => {
  const contractProposal = ProposalContract(library, chainId);
  let data = "";
  let error = null;

  try {
    data = await contractProposal.vote(vote, {
      value,
    });
  } catch (e) {
    let msg = e.message;
    if (inString(msg, "execution reverted: Address already voted")) {
      msg = "execution reverted: Address already voted";
    }
    error = msg;
  }

  return { data, error };
};

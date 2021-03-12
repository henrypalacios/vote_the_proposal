import ProposalContract from "./index";

export const getVotesCount = async (library, networkId) => {
  const proposalContract = ProposalContract(library, networkId);
  let data = {};
  let error = null;

  try {
    const requests = await Promise.all(
      ["votesForNo", "votesForYes"].map((ele, i) => proposalContract[ele]())
    );
    const votesNo = parseInt(requests[0]);
    const votesYes = parseInt(requests[1]);
    data = {
      no: votesNo,
      yes: votesYes,
      total: votesNo + votesYes,
    };
  } catch (e) {
    error = e.message;
    console.error(e);
  }

  return { data, error };
};

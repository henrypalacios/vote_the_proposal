import React, { useState, useEffect } from "react";
import { Card, Loader } from "semantic-ui-react";
import { useWeb3React } from "@web3-react/core";

import { getProposalAddress } from "../ethereum/utils";
import ProposalContract, { getVotesCount } from "../ethereum/proposal_contract";

const SummaryVoteCount = () => {
  const { chainId, library } = useWeb3React();
  const [votesCount, setVotesCount] = useState({ no: 0, yes: 0, total: 0 });
  const [loading, setLoading] = useState(false);
  const contractAddress = getProposalAddress(chainId);

  useEffect(() => {
    (async () => {
      await fetchVotesCount();
    })();

    const proposalContract = ProposalContract(library, chainId);
    proposalContract.on("VoteCasted", () => {
      fetchVotesCount();
    });

    return () => proposalContract.removeAllListeners("VoteCasted");
  }, [chainId]);

  const fetchVotesCount = async () => {
    setLoading(true);
    const { data, error } = await getVotesCount(library, chainId);
    if (!error) {
      setVotesCount(data);
    }

    setLoading(false);
  };

  const calculatePercentegeVotes = (typeVote) => {
    return votesCount["total"] && !loading
      ? ((votesCount[typeVote] * 100) / votesCount["total"]).toFixed(0) + "%"
      : "";
  };

  const renderCards = () => {
    const metaDescription =
      votesCount["total"] && !loading
        ? `Percentage of ${votesCount["total"]} total votes.`
        : "";

    const description = (typeVote) => {
      return loading ? (
        <Loader active={true} inline />
      ) : (
        <h3>{votesCount[typeVote]}</h3>
      );
    };

    const items = [
      {
        header: `Proposal Id: 0`,
        meta: "Address of Proposal Contract",
        description: contractAddress,
        style: { overflowWrap: "break-word" },
      },
      {
        header: `Positives Votes ${calculatePercentegeVotes("yes")}`,
        meta: metaDescription,
        description: description("yes"),
        color: "green",
      },
      {
        header: `Negatives Votes ${calculatePercentegeVotes("no")}`,
        meta: metaDescription,
        description: description("no"),
        color: "red",
      },
    ];

    return <Card.Group centered items={items} />;
  };

  return <div>{renderCards()}</div>;
};

export default SummaryVoteCount;

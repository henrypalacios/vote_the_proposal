import React, { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { utils } from "ethers";
import { Card, Grid } from "semantic-ui-react";

import Layout from "./layouts/Layout";
import { getProposalAddress } from "../ethereum/utils";
import ProposalContract from "../ethereum/ProposalContract";
import VotesList from "./VotesList";

function Home() {
  const { chainId, library } = useWeb3React();
  const contractAddress = getProposalAddress(chainId);
  const [votesCount, setVotesCount] = useState({ no: 0, yes: 0, total: 0 });
  let proposalContract;

  useEffect(() => {
    proposalContract = ProposalContract(library, chainId);

    (async () => {
      try {
        const requests = await Promise.all(
          ["votesForNo", "votesForYes"].map((ele, i) => proposalContract[ele]())
        );
        const votesNo = parseInt(requests[0]);
        const votesYes = parseInt(requests[1]);
        setVotesCount({
          no: votesNo,
          yes: votesYes,
          total: votesNo + votesYes,
        });
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const getPercentegeVotes = (typeVote) => {
    return votesCount["total"]
      ? ((votesCount[typeVote] * 100) / votesCount["total"]).toFixed(0) + "%"
      : "";
  };

  const renderCards = () => {
    const metaDescription = votesCount["total"]
      ? `Percentage of ${votesCount["total"]} total votes.`
      : "";
    const items = [
      {
        header: `Proposal Id: 0`,
        meta: "Address of Proposal Contract",
        description: contractAddress,
        style: { overflowWrap: "break-word" },
      },
      {
        header: `Positives Votes ${getPercentegeVotes("yes")}`,
        meta: metaDescription,
        description: <h3>{votesCount["yes"]}</h3>,
        color: "green",
      },
      {
        header: `Negatives Votes ${getPercentegeVotes("no")}`,
        meta: metaDescription,
        description: <h3>{votesCount["no"]}</h3>,
        color: "red",
      },
    ];

    return <Card.Group centered items={items} />;
  };

  return (
    <Layout>
      <h2>Home</h2>
      <Grid relaxed>
        <Grid.Row>
          <Grid.Column width={16}>{renderCards()}</Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <h3>Votes List (until the last 500k blocks)</h3>
            <VotesList />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  );
}

export default Home;

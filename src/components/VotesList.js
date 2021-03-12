import React, { useState, useEffect } from "react";
import {
  Table,
  Icon,
  Grid,
  Select,
  FormField,
  Dimmer,
  Loader,
} from "semantic-ui-react";
import { useWeb3React } from "@web3-react/core";

import ProposalContract, {
  filterUntilBlock,
} from "../ethereum/proposal_contract";

const VoteRow = ({ vote }) => {
  const type_vote = parseInt(vote.vote);

  const renderVoteIcon = (type_vote) => {
    let propertiesByVote = {
      1: { name: "times circle", color: "red", size: "large" },
      2: { name: "check circle", color: "green", size: "large" },
    };

    return <Icon {...propertiesByVote[type_vote]} />;
  };

  const rowColorProperty = () => {
    return type_vote == 2 ? { positive: true } : { negative: true };
  };

  return (
    <Table.Row {...rowColorProperty()}>
      <Table.Cell>{vote.index}</Table.Cell>
      <Table.Cell>{vote.from}</Table.Cell>
      <Table.Cell>{renderVoteIcon(type_vote)}</Table.Cell>
    </Table.Row>
  );
};

function VotesList() {
  const { Header, Row, HeaderCell, Body } = Table;
  const [loading, setLoading] = useState(false);
  const [votes, setVotes] = useState([]);
  const [votesCount, setVotesCount] = useState(0);
  const { library, chainId } = useWeb3React();
  let lastRecords = [];

  useEffect(() => {
    (async () => {
      await fetchLatestVotes();
    })();

    const proposalContract = ProposalContract(library, chainId);
    proposalContract.on("VoteCasted", () => {
      fetchLatestVotes();
    });

    return () => proposalContract.removeAllListeners("VoteCasted");
  }, [chainId]);

  const fetchLatestVotes = async () => {
    setLoading(true);
    try {
      lastRecords = await filterUntilBlock(library, chainId, 500000);
      setVotes(lastRecords);
      setVotesCount(lastRecords.length);
    } catch (e) {
      console.error(e);
    }

    setLoading(false);
  };

  const renderRows = () => {
    return votes.map((vote, index) => {
      return <VoteRow key={index} vote={{ ...vote, index }}></VoteRow>;
    });
  };

  return (
    <>
      <Grid>
        <Grid.Column></Grid.Column>
      </Grid>
      <Table attached="top" celled>
        <Header>
          <Row>
            <HeaderCell width="1">#</HeaderCell>
            <HeaderCell width="13">Address</HeaderCell>
            <HeaderCell width="2">Vote</HeaderCell>
          </Row>
        </Header>
      </Table>
      <Dimmer.Dimmable as={Table} attached="bottom">
        <Body>
          <Table.Row>
            <Table.Cell style={{ padding: 0 }}>
              <Dimmer active={loading}>
                <Loader size="big">Loading</Loader>
              </Dimmer>
            </Table.Cell>
          </Table.Row>
          {renderRows()}
        </Body>
      </Dimmer.Dimmable>
      <Grid>
        <Grid.Column>
          <p>Found {votesCount} votes.</p>
        </Grid.Column>
      </Grid>
    </>
  );
}

export default VotesList;

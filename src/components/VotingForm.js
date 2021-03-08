import React, { useState } from "react";
import { Form, Input, Message, Button, Icon, Grid } from "semantic-ui-react";
import { useWeb3React } from "@web3-react/core";
import { utils } from "ethers";

import ProposalContract, { VOTE_FEE, VOTE } from "../ethereum/ProposalContract";

const VotingForm = (props) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [vote, setVote] = useState(VOTE["no"]);
  const { library, chainId } = useWeb3React();
  let contractProposal;

  const onSubmit = async (event) => {
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const value = utils.parseEther(VOTE_FEE.toString(), "ether");
    contractProposal = ProposalContract(library, chainId);

    try {
      await contractProposal.vote(vote, {
        value,
      });
      setSuccessMsg("You will redirect to Home!");
      setTimeout(() => {
        props.successfulAction();
      }, 1000);
    } catch (e) {
      setErrorMsg(e.message);
    }

    setLoading(false);
  };

  return (
    <Form error={!!errorMsg} loading={loading} success={!!successMsg}>
      <Message success header="Vote successfully cast!" content={successMsg} />
      <Form.Group inline>
        <label>Vote</label>
        <Form.Radio
          label="No"
          value="1"
          checked={vote == "1"}
          onChange={(event, { value }) => setVote(value)}
        />
        <Form.Radio
          label="Yes"
          value="2"
          checked={vote == "2"}
          onChange={(event, { value }) => setVote(value)}
        />
      </Form.Group>
      <Form.Group inline>
        <label htmlFor="contribution">Amount required to vote</label>
        <Input
          value={VOTE_FEE}
          name="contribution"
          label="ether"
          labelPosition="right"
          type="number"
          disabled
        />
      </Form.Group>
      <Message error header="Error!" content={errorMsg} />

      <Grid>
        <Grid.Column textAlign="right">
          <Button primary onClick={onSubmit}>
            {props.textAction} <Icon name="hand paper" />
          </Button>
        </Grid.Column>
      </Grid>
    </Form>
  );
};

VotingForm.defaultProps = {
  successfulAction: () => console.log("Fire onAction"),
  textAction: "Vote ",
};

export default VotingForm;

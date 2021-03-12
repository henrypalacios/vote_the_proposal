import React, { useState } from "react";
import { Form, Input, Message, Button, Icon, Grid } from "semantic-ui-react";
import { useWeb3React } from "@web3-react/core";
import { utils } from "ethers";

import ProposalContract, { createVote } from "../ethereum/proposal_contract";

const VotingForm = (props) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [vote, setVote] = useState(ProposalContract.VOTE["no"]);
  const { library, chainId } = useWeb3React();
  const voteFee = ProposalContract.VOTE_FEE;

  const onSubmit = async (event) => {
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const value = utils.parseEther(voteFee.toString(), "ether");

    const { data, error } = await createVote(library, chainId, vote, value);
    if (error) {
      setErrorMsg(error);
      setLoading(false);
      return;
    }

    setSuccessMsg(
      "Your transaction has been signed and will appear on the blockhain in an instant."
    );
    setTimeout(() => {
      props.successfulAction();
    }, 6000);

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
          value={voteFee}
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

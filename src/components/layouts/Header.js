import React from "react";
import { Menu, Segment, Icon } from "semantic-ui-react";

import ModalScrolling from "../elements/ModalScrolling";
import VotingForm from "../VotingForm";

export default () => {
  const handleClick = () => {};

  const renderVoteItem = () => {
    return (
      <Menu.Item name="vote" onClick={handleClick}>
        <Icon name="add" />
        Vote
      </Menu.Item>
    );
  };

  return (
    <Segment inverted style={{ marginTop: "1rem", padding: 3 }}>
      <Menu inverted pointing>
        <Menu.Item name="home" active onClick={handleClick}>
          Vote the Proposal
        </Menu.Item>
        <Menu.Menu position={"right"}>
          <ModalScrolling trigger={renderVoteItem()} textAction="Vote">
            <VotingForm />
          </ModalScrolling>
        </Menu.Menu>
      </Menu>
    </Segment>
  );
};

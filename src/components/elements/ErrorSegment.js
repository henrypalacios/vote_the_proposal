import React from "react";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

const ErrorSegment = (props) => (
  <Segment placeholder>
    <Header icon>
      <Icon color="red" name="close" />
      {props.text}
    </Header>
  </Segment>
);

ErrorSegment.defaultProps = {
  text: "An error occurred while trying to load the Ethereum network provider",
};

export default ErrorSegment;

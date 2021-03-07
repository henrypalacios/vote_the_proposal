import React from "react";
import { Dimmer, Loader, Image, Segment } from "semantic-ui-react";

const LoaderOverlap = ({ children }) => (
  <Segment style={{ minHeight: "100vh", padding: "1em 0em" }}>
    <Dimmer active>
      <Loader size="big">{children || "Preparing Files..."}</Loader>
    </Dimmer>

    <Image centered src="/images/centered-paragraph.png" />
  </Segment>
);

export default LoaderOverlap;

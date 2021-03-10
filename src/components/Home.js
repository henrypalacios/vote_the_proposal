import React from "react";
import { Grid } from "semantic-ui-react";

import Layout from "./layouts/Layout";
import VotesList from "./VotesList";
import SummaryVoteCount from "./SummaryVoteCount";

function Home() {
  return (
    <Layout>
      <h2>Home</h2>
      <Grid relaxed>
        <Grid.Row>
          <Grid.Column width={16}>
            <SummaryVoteCount />
          </Grid.Column>
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

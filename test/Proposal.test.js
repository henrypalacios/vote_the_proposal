const path = require("path");
const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");

const proposalCompiled = require("../src/ethereum/ProposalCompiled.json");

const web3 = new Web3(ganache.provider());

let accounts;
let proposal;
let VOTE_FEE;
const VOTE = { no: 1, yes: 2 };

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  try {
    proposal = await new web3.eth.Contract(proposalCompiled.abi)
      .deploy({ data: proposalCompiled.bytecode })
      .send({ from: accounts[0], gas: "3000000" });

    VOTE_FEE = await proposal.methods.VOTE_FEE().call();
  } catch (e) {
    console.log(e);
  }
});

describe("ProposalTest", () => {
  it("deploy proposal Contract", () => {
    assert.ok(proposal.options.address);
  });

  it("Can be vote yes", async () => {
    const vote = VOTE["yes"];
    let votesYesCount = 0;

    try {
      await proposal.methods
        .vote(vote)
        .send({ from: accounts[0], value: VOTE_FEE });

      votesYesCount = await proposal.methods.votesForYes().call();
    } catch (e) {
      console.error(e);
    }

    assert.equal(votesYesCount, 1, "Positive vote count does not match");
  });

  it("Can be vote no", async () => {
    const vote = VOTE["no"];
    let votesNoCount = 0;

    try {
      await proposal.methods
        .vote(vote)
        .send({ from: accounts[0], value: VOTE_FEE });

      votesNoCount = await proposal.methods.votesForNo().call();
    } catch (e) {
      console.error(e);
    }

    assert.equal(votesNoCount, 1, "Negative vote Count does not match");
  });

  it("It is possible get both vote count ", async () => {
    const votesYes = 3;
    const votesNo = 1;
    let votesCount = { yes: 0, no: 0 };

    try {
      await Promise.all(
        Array(votesYes)
          .fill()
          .map((_, i) =>
            proposal.methods
              .vote(VOTE["yes"])
              .send({ from: accounts[i], value: VOTE_FEE })
          )
      );

      const resp = await proposal.methods
        .vote(VOTE["no"])
        .send({ from: accounts[3], value: VOTE_FEE });

      const events = await proposal.getPastEvents("VoteCasted", {
        fromBlock: 0,
        toBlock: "latest",
      });

      events.reduce((accumulator, element) => {
        console.log(element.returnValues);
        if (element.returnValues["vote"] == VOTE["yes"]) {
          votesCount["yes"] += 1;
        } else if (element.returnValues["vote"] == VOTE["no"]) {
          votesCount["no"] += 1;
        }

        return accumulator;
      }, votesCount);
    } catch (e) {
      console.error(e);
    }

    assert.equal(votesYes, votesCount["yes"]);
    assert.equal(votesNo, votesCount["no"]);
  });
});

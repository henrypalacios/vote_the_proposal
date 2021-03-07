# Vote the Proposal

That is DApp challenge that allows people to vote on a proposal.

The contract is deployed at:
[0x3d7c4042365d04c98f58906966ca4c816acf592a](https://rinkeby.etherscan.io/address/0x3d7c4042365d04c98f58906966ca4c816acf592a#code)

## TODO

### Interaction with the contract

- [x] An address/user can vote for proposal (binary) 1=no, 2=yes.
- [x] An contract instance should get votesForYes
- [x] An contract instance should get votesForNo
- [x] An contract instance should querying past events VoteCasted
- [] migrate querys from test to ContractAPI

### Web App

- [] The users can see the resume votesForYes vs votesForNo.
- [] The users can see the list of votes cast, showing address and vote
- [] Users can vote once by paying 0.01 ether through metamask provider

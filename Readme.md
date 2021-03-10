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

### Web App

- [x] Users can vote once by paying 0.01 ether through metamask provider
- [x] The users can see the resume votesForYes vs votesForNo.
- [x] The users can see the list of votes cast, showing address and vote
- [ ] The Counters and Votes List must be updated in real time
- [ ] Add Documentation in this Read.me

### Maybe

- [ ] Refactoring Code Proposal Contract
- [ ] Handle the exception when the user has voted
- [ ] Add Some tests
- [ ] Add Pagination View

# Vote the Proposal

That is DApp challenge that allows people to vote on a proposal.

The contract is deployed at:
[0x3d7c4042365d04c98f58906966ca4c816acf592a](https://rinkeby.etherscan.io/address/0x3d7c4042365d04c98f58906966ca4c816acf592a#code)

## Getting Started

### 📋 Prerequisites

- node.js
- npm
- ganache (for testing with a test Ethereum network only)

### 🚀 Installation

- Installing and run with `make` (that just work with `Unix` environments)

```bash
make
```

- Manually Installation

```bash
npm install && npm run start
```

## ⚒ Built with

- [React v17](https://reactjs.org/docs/getting-started.html)
- [Semantic-UI v2](https://react.semantic-ui.com)
- [web3-react](https://github.com/NoahZinsmeister/web3-react)
- [ethers v5](https://docs.ethers.io/v5/)

## 🖇 TODO

### Interaction with the contract

- [x] An address/user can vote for proposal (binary) 1=no, 2=yes.
- [x] An contract instance should get votesForYes
- [x] An contract instance should get votesForNo
- [x] An contract instance should querying past events VoteCasted

### Web App

- [x] Users can vote once by paying 0.01 ether through metamask provider
- [x] The users can see the resume votesForYes vs votesForNo.
- [x] The users can see the list of votes cast, showing address and vote
- [x] The Counters and Votes List must be updated in real time
- [x] Add Documentation in this Read.me

### Maybe

- [ ] Refactoring Code Proposal Contract
- [x] Handle the exception when the user has voted
- [ ] Add Some tests
- [ ] Add Pagination View

## References

- [Protofire Web3 boilerplate](https://github.com/protofire/web3-react-boilerplate)
- [Logs and Events Ethereum, linum-labs Blog](https://medium.com/linum-labs/everything-you-ever-wanted-to-know-about-events-and-logs-on-ethereum-fec84ea7d0a5)
- [How to Fetch and Update Data from Ethereum, consensys Blog](https://github.com/protofire/web3-react-boilerplate)

const HDWallet = require("@truffle/hdwallet-provider");
const Web3 = require("web3");

const proposalCompiled = require("../src/ethereum/ProposalCompiled.json");
const ganacheMnemonic =
  "camp believe brisk plastic rely sweet clip problem fat hero kidney opinion";

const ganacheProvider = new HDWallet(ganacheMnemonic, "HTTP://127.0.0.1:8545");

const web3 = new Web3(ganacheProvider);
const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("Attempting to deploy from account: ", accounts[0]);

  const result = await new web3.eth.Contract(proposalCompiled.abi)
    .deploy({
      data: proposalCompiled.bytecode,
    })
    .send({ from: accounts[0] });

  console.log("Contract deployed to", result.options.address);

  web3.currentProvider.engine.stop();
};

deploy();

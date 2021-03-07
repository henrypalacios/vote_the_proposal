import ProposalCompiled from "./ProposalCompiled.json";

class ProposalContract {
  VOTE = { no: 1, yes: 2 };

  /**
   * @param {Web3} web3
   * @param {string} contractAddress
   * @param {string} accountAddress
   **/
  constructor(web3, contractAddress, accountAddress) {
    this.web3 = web3;
    this.account = accountAddress;

    this.contract = new this.web3.eth.Contract(
      ProposalCompiled.abi,
      contractAddress
    );
  }
}

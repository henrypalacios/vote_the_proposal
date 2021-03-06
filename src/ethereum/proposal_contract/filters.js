import { utils } from "ethers";

import { getProposalContractData, ProposalCompiled } from "./index";

export const filterUntilBlock = async (library, networkId, atLeastRows) => {
  let rows = [];
  const topic = "VoteCasted(uint256,address,uint256)";
  const contractData = getProposalContractData(networkId);
  const latestBlock = await library.getBlockNumber();
  const last100 = latestBlock - 500000;
  const fromBlock = contractData.block > last100 ? contractData.block : last100;

  rows = await proposalFilterLogs(
    library,
    networkId,
    topic,
    latestBlock,
    fromBlock
  );

  return rows.splice(0, 99);
};

export const proposalFilterLogs = async (
  library,
  networkId,
  topic,
  toBlock,
  fromBlock
) => {
  const contractData = getProposalContractData(networkId);
  const iface = new utils.Interface(ProposalCompiled.abi);

  console.debug("from:", fromBlock, "to:", toBlock);
  if (toBlock === undefined) {
    console.log("entre");
    const latestBlock = await library.getBlockNumber();
    toBlock = latestBlock;
  }

  const filter = {
    address: contractData.address,
    fromBlock: fromBlock === undefined ? toBlock : fromBlock,
    toBlock: toBlock,
    topics: [utils.keccak256(utils.toUtf8Bytes(topic))],
  };

  const logs = await library.getLogs(filter);

  const decodedEvents = logs.map((log) => {
    const fields = ["from", "vote"];
    const decoded = iface.parseLog(log);
    // const decoded = iface.decodeEventLog("VoteCasted", log.data); TODO check How to parsed Indexed

    return fields.reduce((accumulator, field) => {
      accumulator[field] = decoded.args[field];

      return accumulator;
    }, {});
  });

  return decodedEvents;
};

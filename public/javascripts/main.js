var previousBlock = { number: 0 };
var currentBlock;

class BlockExplorer {
  web3;
  constructor() {
    this.web3 = new Web3(
      new Web3.providers.HttpProvider(
        "https://mainnet.infura.io/v3/7f5a496f89304fbfa64e08c8560114f6"
      )
    );
  }
  async checkBlock() {
    let block = await this.web3.eth.getBlock("latest");
    currentBlock = block;
    if (currentBlock != null) {
      if (currentBlock.number > previousBlock.number) {
        previousBlock = currentBlock;
        sendBlock(currentBlock);
      }
    }
  }
}

function sendBlock(_block) {
  // console.log(_block);

  if (_block.transactions.length >= 0) {

    //Göndermek istediğin verileri objeye tanımlaman yeterli.
    const publishData = {
      number: _block.number,
      gasUsed: _block.gasUsed,
      miner: _block.miner,
      parentHash: _block.parentHash,
      size: _block.size,
      baseFeePerGas: _block.baseFeePerGas,
      hash: _block.hash,
      sha3Uncles: _block.sha3Uncles,
      timestamp: _block.timestamp,
      extraData: _block.extraData,
      nonce: _block.nonce,
      stateRoot: _block.stateRoot,
      difficulty: _block.difficulty,
      totalDifficulty: _block.totalDifficulty,
      mixHash: _block.mixHash,
      receiptsRoot: _block.receiptsRoot
    };
    console.log(publishData);
    mqttPublish(publishData);

  }
}

function loop() {
  blockExplorer.checkBlock();
  setTimeout(loop, 200);
}

var blockExplorer = new BlockExplorer();
loop();

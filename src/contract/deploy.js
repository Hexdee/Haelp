const { AeSdk, Node, MemoryAccount, Compiler } = require('@aeternity/aepp-sdk');
const fs = require("fs");


const CONTRACT_SOURCE = fs.readFileSync("haelp.aes", encoding="utf-8")

//console.log(CONTRACT_SOURCE)

const ACCOUNT_KEYPAIR = {
  publicKey: 'ak_e9UjhUM8ePgZUPkFgxFJ1tqv6bTwfeqhxcnTBcrYDyW5QhgqU',
  secretKey: 'eba8786a506fd20e8b00f117e6d6598fd0943ff3d0bd926aea5e1c35802ce36a54584dc898d97866e538fb8a6bfa26db4ea60d69c87c68949b4531078aab2ea2',
};
const NODE_URL = 'https://testnet.aeternity.io';
const COMPILER_URL = 'https://compiler.aepps.com';

(async () => {
  const account = new MemoryAccount({ keypair: ACCOUNT_KEYPAIR });
  const node = new Node(NODE_URL);
  const aeSdk = new AeSdk({
    nodes: [{ name: 'testnet', instance: node }],
    compilerUrl: COMPILER_URL,
  });
  await aeSdk.addAccount(account, { select: true });
  const contract = await aeSdk.getContractInstance({ source: CONTRACT_SOURCE });
  //const aci = await contract._aci
  //fs.writeFileSync('./ACI.json', JSON.stringify(aci));

	const deployInfo = await contract.deploy();
	const tx = await contract.methods.create_campaign("Legacy", "Raise fund for Legacy, a decentralized app that prevent lose of funds", "https://generisonline.com/wp-content/uploads/2022/04/legacy-legacy-word-white-paper-151490674.jpg", 500000000000000000000)
	await contract.methods.donate(0, {amount: 1000000000000000000});
	const tx1 = await contract.methods.create_campaign("Greener Earth", "We are planning to plant 5000 trees before the end of the year, donate to support us", "https://greentumble.com/wp-content/uploads/2015/10/plant-a-tree.jpg", 1000000000000000000000)
	const tx2 = await contract.methods.get_campaigns()
	console.log(tx2.decodedResult);

	console.log("contract address", deployInfo.address);
})();

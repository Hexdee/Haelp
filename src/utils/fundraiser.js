// import { v4 as uuid4 } from "uuid";
// import { parseNearAmount } from "near-api-js/lib/utils/format";
import { AeSdk, MemoryAccount, Node } from '@aeternity/aepp-sdk'

import CONTRACT_SOURCE from "./contractSource"

const NODE_URL = 'https://testnet.aeternity.io';
const COMPILER_URL = 'https://compiler.aepps.com';

const node = new Node('https://testnet.aeternity.io') // ideally host your own node
const account = new MemoryAccount({
  // provide a valid keypair with your secretKey and publicKey
  keypair: { secretKey: SECRET_KEY, publicKey: PUBLIC_KEY }
})

const aeSdk = new AeSdk({
  nodes: [
    { name: 'testnet', instance: node }
  ],
  compilerUrl: 'https://compiler.aepps.com', // ideally host your own compiler
})
await aeSdk.addAccount(account, { select: true })



(async () => {
  const account = new MemoryAccount({ keypair: ACCOUNT_KEYPAIR });
  const node = new Node(NODE_URL);
  const aeSdk = new AeSdk({
    nodes: [{ name: 'testnet', instance: node }],
    compilerUrl: COMPILER_URL,
  });
  await aeSdk.addAccount(account, { select: true });
  console.log(CONTRACT_SOURCE);
  const contract = await aeSdk.getContractInstance({ source: CONTRACT_SOURCE });


const GAS = 100000000000000;

export function startFundme(fundme) {
  // fundme.id = uuid4();
  // fundme.target = parseNearAmount(fundme.target + "");
  return window.contract.startFundme({ fundme });
}

export function getFundmes() {
  return window.contract.getFundmes();
}

export async function donate({ id, amount }) {
  await window.contract.donate({ fundmeId: id }, GAS, amount / 1e18);
}


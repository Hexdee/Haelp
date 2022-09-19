// import { v4 as uuid4 } from "uuid";
// import { parseNearAmount } from "near-api-js/lib/utils/format";
import { AeSdk, MemoryAccount, Node } from '@aeternity/aepp-sdk'

import CONTRACT_SOURCE from "./contractSource"

const NODE_URL = 'https://testnet.aeternity.io';
const COMPILER_URL = 'https://compiler.aepps.com';

let account;

const node = new Node('https://testnet.aeternity.io') // ideally host your own node

const aeSdk = new AeSdk({
  nodes: [
    { name: 'testnet', instance: node }
  ],
  compilerUrl: 'https://compiler.aepps.com', // ideally host your own compiler
})
const sourceCode = CONTRACT_SOURCE
// const contractInstance = await aeSdk.getContractInstance({ source: sourceCode })


export function startFundme(fundme) {

  return;
}

export function getFundmes() {
  return;
}

export async function donate({ id, amount }) {
  return;
}


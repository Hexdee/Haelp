import { AeSdkAepp, Node, BrowserWindowMessageConnection, walletDetector, MemoryAccount } from '@aeternity/aepp-sdk';
import haelp from './contractSource';
const contractAddress = "ct_AJj3CAJtq2iH46UxupPH8BqphD3u2MRgo787ML2AcmXNbGUEc";

const ACCOUNT_KEYPAIR = {
  publicKey: 'ak_e9UjhUM8ePgZUPkFgxFJ1tqv6bTwfeqhxcnTBcrYDyW5QhgqU',
  secretKey: 'eba8786a506fd20e8b00f117e6d6598fd0943ff3d0bd926aea5e1c35802ce36a54584dc898d97866e538fb8a6bfa26db4ea60d69c87c68949b4531078aab2ea2',
};

// const TESTNET_NODE_URL = 'https://testnet.aeternity.io';
// const MAINNET_NODE_URL = 'https://mainnet.aeternity.io';
const COMPILER_URL = 'https://compiler.aepps.com';

var walletInfo;
var walletConnected = false;
// var account;
var balance;

const node = new Node('https://testnet.aeternity.io')
const account = new MemoryAccount({ keypair: ACCOUNT_KEYPAIR });
const aeSdk = new AeSdkAepp({
  nodes: [{ name: 'testnet', instance: node }],
  compilerUrl: COMPILER_URL,
  onNetworkChange: async ({networkId}) => console.log(networkId),
  onAddressChange: async ({current}) => console.log(current[0]),
  onDisconnect: () => console.log("Aepp is disconnected")
})

export async function getCampaigns () {
  const contractInstance = await aeSdk.getContractInstance({ source: haelp });
  const ACI = await contractInstance._aci;
  const contract = await aeSdk.getContractInstance({aci: ACI, contractAddress: contractAddress})
  const res = await contract.methods.get_campaigns();
  const campaigns = res.decodedResult;
  return campaigns;
}

// export async function createCampaign (title, description, image, target) {
//   await aeSdk.addAccount(account, { select: true });
//   const contract = await getContract();
//   await contract.methods.create_campaign(title, description, image, target);
// }

export const scanForWallets = async() => {
    return new Promise((resolve) => {
        const handleWallets = async ({ wallets, newWallet }) => {
          newWallet = newWallet || Object.values(wallets)[0]
          console.log('newWallet', newWallet)
          stopScan()
          walletInfo = await aeSdk.connectToWallet(newWallet.getConnection())
          walletConnected = true
          const { address: { current } } = await aeSdk.subscribeAddress('subscribe', 'connected')
          console.log(Object.keys(current)[0]);
          resolve()
        }
  
        const scannerConnection = new BrowserWindowMessageConnection()
        const stopScan = walletDetector(scannerConnection, handleWallets)
    })
};

export const login = async() => {
  try {
    await scanForWallets();
  } catch (err) {
    console.log(err)
  }
  return aeSdk;
}


export async function logout () {
  await aeSdk.disconnectWallet();
  walletConnected = false;
}

// export async function accountBalance() {
//   await scanForWallets();
//   return aeSdk.address();
//   // return balance / 1e18;
// }

// export async function getAccountId() {
//   return account;
// }

// export const getAccountId = async() => {
//     const { address: { current } } = await aeSdk.subscribeAddress('subscribe', 'connected')
//     const accountId = Object.keys(current)[0]
//     return accountId
// };
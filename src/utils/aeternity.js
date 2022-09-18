import { AeSdkAepp, Node, BrowserWindowMessageConnection, walletDetector } from '@aeternity/aepp-sdk';

// const TESTNET_NODE_URL = 'https://testnet.aeternity.io';
// const MAINNET_NODE_URL = 'https://mainnet.aeternity.io';
const COMPILER_URL = 'https://compiler.aepps.com';

var walletInfo;
var walletConnected = false;
var account;
var balance;

const node = new Node('https://testnet.aeternity.io')
const aeSdk = new AeSdkAepp({
  nodes: [{ name: 'testnet', instance: node }],
  compilerUrl: COMPILER_URL,
  onNetworkChange: async ({networkId}) => console.log(networkId),
  onAddressChange: async ({current}) => console.log(current[0]),
  onDisconnect: () => console.log("Aepp is disconnected")
})


export async function login () {
  return new Promise((resolve) => {
    const handleWallets = async ({ wallets, newWallet }) => {
      newWallet = newWallet || Object.values(wallets)[0]
    //   if (confirm(`Do you want to connect to wallet ${newWallet.info.name} with id ${newWallet.info.id}`)) {
        stopScan()
        walletInfo = await aeSdk.connectToWallet(newWallet.getConnection())
        walletConnected = true
        const { address: { current } } = await aeSdk.subscribeAddress('subscribe', 'connected')
        account = Object.keys(current)[0]
        balance = await aeSdk.getBalance(account)
        resolve()
        console.log(await getAccountId())
        // window.location.reload()
    //   }
    }
    const scannerConnection = new BrowserWindowMessageConnection();
    const stopScan = walletDetector(scannerConnection, handleWallets);
  })
}

export async function logout () {
  await aeSdk.disconnectWallet();
  walletConnected = false;
}

export async function accountBalance() {
  return balance / 1e18;
}

// export async function getAccountId() {
//   return account;
// }

export const getAccountId = async() => {
    const { address: { current } } = await aeSdk.subscribeAddress('subscribe', 'connected')
    const accountId = Object.keys(current)[0]
    return accountId
};
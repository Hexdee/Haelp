import { AeSdkAepp, Node, BrowserWindowMessageConnection, walletDetector} from '@aeternity/aepp-sdk';
import haelp from './contractSource';

export const contractAddress = "ct_tUHAMNd59QzVoTas7goG5HvfvhYBydbWV2aNbw7HmoJaDuBAS";

// const TESTNET_NODE_URL = 'https://testnet.aeternity.io';
// const MAINNET_NODE_URL = 'https://mainnet.aeternity.io';
const COMPILER_URL = 'https://compiler.aepps.com';


const node = new Node('https://testnet.aeternity.io')

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

export const scanForWallets = async() => {
    return new Promise((resolve) => {
        const handleWallets = async ({ wallets, newWallet }) => {
          try {
            newWallet = newWallet || Object.values(wallets)[0]
            stopScan()
            await aeSdk.connectToWallet(newWallet.getConnection())
            const { address: { current } } = await aeSdk.subscribeAddress('subscribe', 'connected')
            console.log(Object.keys(current)[0]);
            resolve()
          } catch (err) {
            console.log(err);
          }
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
  window.location.reload();
}

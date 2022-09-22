import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AddFundme from "./AddFundme";
import Fundme from "./Fundme";
import Loader from "../utils/Loader";
import { Button, Nav, Row } from "react-bootstrap";
import { NotificationSuccess, NotificationError } from "../utils/Notifications";
import {  contractAddress, getCampaigns as getFundmeList, login, logout } from "../../utils/aeternity";
import haelp from '../../utils/contractSource';
import Wallet from "../Wallet";

const Fundmes = () => {
  const [fundmes, setFundmes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingConnection, setLoadingConnection] = useState(false);
  const [loadingDonation, setLoadingDonation] = useState(false);
  const [aeSdk, setAeSdk] = useState(null);
  const [user, setUser] = useState();
  const [balance, setBalance] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

  async function getContract() {
    const contractInstance = await aeSdk.getContractInstance({ source: haelp });
    const ACI = await contractInstance._aci;
    const contract = await aeSdk.getContractInstance({aci: ACI, contractAddress: contractAddress})
    return contract;
  }

  const createCampaign = async (title, description, image, target) => {
    const contract = await getContract();
    await contract.methods.create_campaign(title, description, image, target);
    getFundmes();
  }

  const getFundmes = async () => {
    try {
      let f = localStorage.getItem('fundmes');
      if (f) {
        setFundmes(JSON.parse(f));
      }
      getFundmeList().then((res) => {
        //Convert BigInts to string before storing locally
        res = res.map((fundMe) => {
          fundMe.target = fundMe.target.toString();
          fundMe.donated = fundMe.donated.toString();
          fundMe.withdrawn = fundMe.withdrawn.toString();
          return fundMe;
        });
        setFundmes(res);
        localStorage.setItem("fundmes", JSON.stringify(res));
      })
      //Update user balance if connected
      if(aeSdk) {
        const accountBalance = (await aeSdk.getBalance(user)) / 1e18;
        setBalance(accountBalance);
      }
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="failed to get campaigns"/>)
    };
  }

  const init = () => {
    if(localStorage.getItem("isConnected")) {
      connectWallet();
      setIsConnected(true);
    }
    if(fundmes.length == 0){
      setLoading(true);
    }
    getFundmes().then(() => setLoading(false));
    if(aeSdk && aeSdk._accounts) {
      setIsConnected(true);
    }
  }

  useEffect(() => {
    init();
  }, [aeSdk])

  const connectWallet = async() => {
    setLoadingConnection(true);
    try {
      const client = await login();
      setAeSdk(client);
      const account = Object.keys(client._accounts.current)[0]
      setUser(account);
      const accountBalance = (await client.getBalance(account)) / 1e18;
      setBalance(accountBalance);
      setIsConnected(true);
      setLoadingConnection(false);
      localStorage.setItem("isConnected", "true");
    } catch (err) {
      console.log(err);
      toast(<NotificationError text="failed to connect wallet"/>)
      setLoadingConnection(false);
    }
  }

  const disconnectWallet = async() => {
    try {
      setIsConnected(false);
      localStorage.removeItem("isConnected");
      await logout();
    } catch (err) {
      console.log(err);
      toast(<NotificationError text="an error occured"/>)
    }
  }

const addFundme = async (data) => {
  try {
    await createCampaign(data.title, data.description, data.image, data.target * 1e18);
    toast(<NotificationSuccess text="Campaign created successfully." />);
  } catch (err) {
    toast(<NotificationError text="Failed to create a campaign." />);
  }
}

const donate = async(id, amount) => {
  const contract = await getContract();
  await contract.methods.donate(Number(id), { amount: Number(amount) });
}

const withdraw = async(id) => {
  const contract = await getContract();
  await contract.methods.withdraw(Number(id));
}

const withdrawFrom = async (id) => {
  try {
    if(!aeSdk) {
      toast(<NotificationError text="Wallet not connected!" />);
      return;
    }
    await withdraw(id)
      .then((res) => getFundmes());
    toast(<NotificationSuccess text="Funds withdrawn successfully!" />);
  } catch (error) {
    console.log(error)
    toast(<NotificationError text="Withdrawal failed!" />);
  }
}


const donateTo = async (id, amount) => {
  try {
    if(!aeSdk) {
      toast(<NotificationError text="Wallet not connected!" />);
      return;
    }
    await donate(id, amount)
      .then((res) => getFundmes());
    toast(<NotificationSuccess text="Funds donated successfully!" />);
  } catch (error) {
    console.log(error)
    toast(<NotificationError text="Failed to donate!" />);
  }
};

  return (
    <>
      {!loading ? (
        <>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="fs-8 fw-bold mb-0">HAELP</h1>
            {isConnected ?
              <Nav className="justify-content-end pt-3 pb-5" style={{gap: 16}}>
                      <Nav.Item>
                        <Wallet
                          address={user}
                          amount={balance.toFixed(2)}
                          symbol="AE"
                          destroy={disconnectWallet}
                        />
                      </Nav.Item>
                      <AddFundme save={addFundme} /> 
              </Nav> :
            <Button
            onClick={connectWallet}
            variant="outline-light"
            className="rounded-pill px-3 mt-3"
          >
            {loadingConnection ? <Loader /> : "Connect Wallet"}
          </Button>}
          </div>
          <Row xs={1} sm={2} lg={3} className="g-3  mb-5 g-xl-4 g-xxl-5">
            {fundmes.map((_fundme, index) => (
              <Fundme
                key={index}
                fundme={{
                  ..._fundme,
                } }
                donate={donateTo}
                withdraw={withdrawFrom}
                id={index}
                user={user}
                isLoading={loadingDonation}
              />
            ))}
          </Row>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Fundmes;
import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import AddFundme from "./AddFundme";
import Fundme from "./Fundme";
import Loader from "../utils/Loader";
import { Button, Row } from "react-bootstrap";
import { NotificationSuccess, NotificationError } from "../utils/Notifications";
// import {
//   getFundme as getFundmeList,
//   donate,
//   startFundme,
// } from "../../utils/fundraiser";
import { getCampaigns as getFundmeList } from "../../utils/aeternity";
import { login } from "../../utils/aeternity";

const Fundmes = () => {
  const [isConnected, setIsConnected] = useState(false)

  const startFundme = () => {}
  const donate = () => {}
  const [fundmes, setFundmes] = useState([]);
  const [loading, setLoading] = useState(false);

  const getFundmes = useCallback(async () => {
    try {
      setLoading(true);
      setFundmes(await getFundmeList());
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  });

const addFundme = async (data) => {
  try {
    setLoading(true);
    startFundme(data).then((resp) => {
      getFundmes();
    });
    toast(<NotificationSuccess text="Campaign created successfully." />);
  } catch (error) {
    console.log({ error });
    toast(<NotificationError text="Failed to create a campaign." />);
  } finally {
    setLoading(false);
  }
};

const donateTo = async (id, amount) => {
  try {
    await donate({
      id,
      amount,
    }).then((resp) => getFundmes());
    toast(<NotificationSuccess text="Funds donated successfully!" />);
  } catch (error) {
    toast(<NotificationError text="Failed to donate!" />);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  getFundmes();
}, []);

  return (
    <>
      {!loading ? (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="fs-8 fw-bold mb-0">HAELP</h1>
            {isConnected ?
            <AddFundme save={addFundme} /> :
            <Button
            onClick={login}
            variant="outline-light"
            className="rounded-pill px-3 mt-3"
          >
            Connect Wallet
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
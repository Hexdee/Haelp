import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import AddFundme from "./AddFundme";
import Fundme from "./Fundme";
import Loader from "../utils/Loader";
import { Row } from "react-bootstrap";
import { NotificationSuccess, NotificationError } from "../utils/Notifications";
import {
  getFundmes as getFundmeList,
  donate,
  startFundme,
} from "../../utils/fundraiser";

const Fundmes = () => {
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
            <AddFundme save={addFundme} />
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
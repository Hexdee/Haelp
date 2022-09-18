import React, { useCallback, useEffect, useState } from "react";
import { Container, Nav } from "react-bootstrap";
import { login, logout as destroy, accountBalance, getAccountId } from "./utils/aeternity";
import Wallet from "./components/Wallet";
import { Notification } from "./components/utils/Notifications";
import Fundmes from "./components/fundraiser/Fundmes";
import Cover from "./components/utils/Cover";
import coverImg from "./assets/img/donate.png";
import "./App.css";

const App = function AppWrapper() {
  const [account, setAccount] = useState();
  const [balance, setBalance] = useState("0");

  const getBalance = useCallback(async () => {
    setAccount(await getAccountId())
    if (account) {
      setBalance(await accountBalance());
    }
    // console.log(await getAccountId())
  });

  useEffect(() => {
    getBalance();
  }, []);

return (
    <div className='App'>
      {/* <h1>hello</h1> */}
      <Notification />
      {account ? (
        <Container fluid="md">
          <Nav className="justify-content-end pt-3 pb-5">
            <Nav.Item>
              <Wallet
                address={account}
                amount={balance}
                symbol="AE"
                destroy={destroy}
              />
            </Nav.Item>
          </Nav>
          <main><Fundmes /></main>
        </Container>
      ) : (
        <Cover name="Haelp" login={login} coverImg={coverImg} />
      )}
    </div>
  );
};

export default App;
import React, { useCallback, useEffect, useState } from "react";
import { Container, Nav } from "react-bootstrap";
import Wallet from "./components/Wallet";
import { Notification } from "./components/utils/Notifications";
import Fundmes from "./components/fundraiser/Fundmes";
import Cover from "./components/utils/Cover";
import coverImg from "./assets/img/donate.png";
import "./App.css";

const App = function AppWrapper() {
  const [account, setAccount] = useState();
  const [balance, setBalance] = useState("0");

  const destroy = () => {}

  useEffect(() => {
  }, [account]);

return (
    <div className='App'>
      {/* <h1>hello</h1> */}
      <Notification />
      {/* {account ? ( */}
        <Container fluid="md">
          <main><Fundmes /></main>
        </Container>
      {/* ) : (
        <Cover name="Haelp" coverImg={coverImg} />
      )} */}
    </div>
  );
};

export default App;
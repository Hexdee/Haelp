import React from "react";
import { Container} from "react-bootstrap";
import { Notification } from "./components/utils/Notifications";
import Fundmes from "./components/fundraiser/Fundmes";
import "./App.css";


const App = function AppWrapper() {

return (
    <div className='App'>
      <Notification />
        <Container fluid="md">
          <main><Fundmes /></main>
        </Container>
    </div>
  );
};

export default App;
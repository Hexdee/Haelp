import React, {useState} from "react";
import PropTypes from "prop-types";
import { Card, Button, Col, Badge, Stack, Form } from "react-bootstrap";
import Loader from "../utils/Loader";
import { toast } from "react-toastify";
import { NotificationError } from "../utils/Notifications";


const Fundme = ({ fundme, donate, withdraw, id, user }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [amount, setAmount] = useState("");
    let { target, title, description, image, owner, donated} =
      fundme;

    target = Number(target) / 1e18;
    donated = Number(donated) / 1e18;;

  const triggerDonate = async () => {
    setIsLoading(true);
    try {
      await donate(id, Number(amount) * 1e18, isLoading);
      setAmount("");
      setIsLoading(false);
    } catch (error) {
      console.log(error); 
      toast(<NotificationError text="Failed to donate!" />);
      setIsLoading(false);
    }
  };

  const triggerWithdraw = () => {
    withdraw(id);
  }

  return (
    <Col>
      <Card className=" h-100">
        <Card.Header>
          <Stack direction="horizontal" gap={2} styles="overflow: hidden">
            <span className="font-monospace text-secondary">{owner.slice(0, 25)}...</span>
            {/* <Badge bg="secondary" className="ms-auto">
              {donations} Donations
            </Badge> */}
          </Stack>
        </Card.Header>
        <div className=" ratio ratio-4x3">
          <img src={image} alt={title} style={{ objectFit: "cover" }} />
        </div>
        <Card.Body className="d-flex  flex-column" style={{ textAlign: "left" }}>
          <Card.Title style={{ color: "#FF6247", fontWeight: "700" }}>{title}</Card.Title>
          <Card.Text className="flex-grow-1" style={{ fontSize: "14px" }}>{description}</Card.Text>
          <Card.Text className="text-secondary">
            <span>Target: {target} AE</span>
          </Card.Text>
          <Card.Text className="text-secondary">
            <span>Raised: {donated} AE</span>
          </Card.Text>
            {user != owner &&
              <Form.Control
                type="text"
                onChange={(e) => { setAmount(e.target.value); }}
                placeholder="Enter amount to donate"
                value={amount}
              />
            }
          {user == owner ?
          <Button
            variant="outline-dark"
            onClick={triggerWithdraw}
            className="w-100 py-3"
          >
            Withdraw
          </Button> :
          <Button
            variant="outline-dark"
            onClick={triggerDonate}
            className="w-100 py-3 mt-3"
            disabled={amount === ""}
          >
            {isLoading ? <Loader /> : "Donate"}
          </Button>}
        </Card.Body>
      </Card>
    </Col>
  );
};

Fundme.propTypes = {
  fundme: PropTypes.instanceOf(Object).isRequired,
  donate: PropTypes.func.isRequired,
};

export default Fundme;
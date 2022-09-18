import React, {useState} from "react";
import PropTypes from "prop-types";
import { Card, Button, Col, Badge, Stack, Form } from "react-bootstrap";

const Fundme = ({ fundme, donate }) => {
    const [amount, setAmount] = useState("");
  let { id, target, title, description, image, organizer, raised, donations } =
    fundme;

    target = target / 1e18;
    raised = raised / 1e18;;

  const triggerDonate = () => {
    donate(id, amount);
  };

  return (
    <Col key={id}>
      <Card className=" h-100">
        <Card.Header>
          <Stack direction="horizontal" gap={2}>
            <span className="font-monospace text-secondary">{organizer}</span>
            <Badge bg="secondary" className="ms-auto">
              {donations} Donations
            </Badge>
          </Stack>
        </Card.Header>
        <div className=" ratio ratio-4x3">
          <img src={image} alt={title} style={{ objectFit: "cover" }} />
        </div>
        <Card.Body className="d-flex  flex-column text-center">
          <Card.Title>{title}</Card.Title>
          <Card.Text className="flex-grow-1 ">{description}</Card.Text>
          <Card.Text className="text-secondary">
            <span>Target: {target} NEAR</span>
          </Card.Text>
          <Card.Text className="text-secondary">
            <span>Raised: {raised} NEAR</span>
          </Card.Text>
              <Form.Control
                type="text"
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                placeholder="Enter amount to donate"
              />
          <Button
            variant="outline-dark"
            onClick={triggerDonate}
            className="w-100 py-3"
          >
            Donate
          </Button>
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
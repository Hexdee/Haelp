import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
// import { getAccountId } from "../../utils/aeternity";
import { login } from "../../utils/aeternity";

const Cover = ({ name, coverImg }) => {

  // useEffect(() => {
  //   console.log("hi")
  // }, [])

  if ((name, coverImg)) {
    return (
      <div
        className="d-flex justify-content-center flex-column text-center "
        style={{ background: "tomato", minHeight: "100vh" }}
      >
        <div className="mt-auto text-light mb-5">
          <div
            className=" ratio ratio-1x1 mx-auto mb-2"
            style={{ maxWidth: "320px" }}
          >
            <img src={coverImg} alt="" />
          </div>
          <h1>{name}</h1>
          <p>Please connect your wallet to continue.</p>
          <Button
            onClick={login}
            variant="outline-light"
            className="rounded-pill px-3 mt-3"
          >
            Connect Wallet
          </Button>
        </div>
        <p className="mt-auto text-secondary">HAELP</p>
      </div>
    );
  }
  return null;
};

Cover.propTypes = {
  name: PropTypes.string,
};

Cover.defaultProps = {
  name: "",
};

export default Cover;
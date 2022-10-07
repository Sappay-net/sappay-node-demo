import React, { useState, useEffect } from "react";
import { REACT_APP_BACKEND_URL } from "../config";
import cofee from "../assets/coffee_icon_black.svg";

const RedirectHandler = () => {
  const [didSucceed, setdidSucceed] = useState(null);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    fetch(
      `${REACT_APP_BACKEND_URL}/getCheckoutStatus?invoice_id=${query.get(
        "invoice_id"
      )}`
    )
      .then((response) => response.json())
      .then(({ response }) => {
        if (response.status !== "INITIATE") {
          setdidSucceed(true);
        } else {
          setdidSucceed(false);
        }
      })
      .catch((error) => {
        setdidSucceed(false);
      });
  }, []);

  return (
    <div className="redirect-handler">
      {didSucceed === null ? (
        <Loading />
      ) : didSucceed ? (
        <Success />
      ) : (
        <Failure />
      )}
    </div>
  );
};

export default RedirectHandler;

// loading Component

const Loading = () => {
  return (
    <div className="loading">
      <h1>Loading...</h1>
    </div>
  );
};

// success Component

const Success = () => {
  return (
    <div className="succeed">
      <h1>Payment Successful</h1>
      <h2>
        Thankyou for...{" "}
        <img
          src={cofee}
          alt="coffee icon"
          height={20}
          style={{ margin: "-3px", transform: "rotate(15deg)" }}
        />
      </h2>
    </div>
  );
};

// failure Component

const Failure = () => {
  return (
    <div className="failed">
      <h1>Payment Failed</h1>
    </div>
  );
};

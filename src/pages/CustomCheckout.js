import React, { useState } from "react";
import CustomCheckoutForm from "../components/CustomCheckoutForm";
import Layout from "../components/Layout";
import { REACT_APP_BACKEND_URL } from "../config";

const CustomCheckout = () => {
  const [result, setResult] = useState({
    status: "pending",
    message: "",
  });

  const handleVerify = async (values) => {
    const { msisdn, otp } = values;
    const invoiceId = window.location.pathname.split("/")[2];
    try {
      const response = await fetch(`${REACT_APP_BACKEND_URL}/checkout/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          invoice_id: invoiceId,
          customer_msisdn: msisdn,
          otp,
          payment_processor_id: "11688813752134336",
        }),
      });
      const data = await response.json();
      // eslint-disable-next-line
      if (!response.ok) {
        setResult({
          status: "error",
          message: "Invalid OTP or Something went wrong",
        });
      } else {
        setResult({
          status: "success",
          message: "Payment successful",
        });
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <h1>Pay via Orange Money</h1>
      {result.status !== "pending" && (
        <h4 className={result.status}>{result.message}</h4>
      )}
      <CustomCheckoutForm onSubmit={handleVerify} />
    </Layout>
  );
};

export default CustomCheckout;

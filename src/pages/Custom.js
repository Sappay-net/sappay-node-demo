import React from "react";
import DetailsForm from "../components/DetailsForm";
import Layout from "../components/Layout";
import { REACT_APP_BACKEND_URL } from "../config";

const Custom = () => {
  const handleBuy = async (values) => {
    const { name, email, city, country } = values;
    try {
      const response = await fetch(`${REACT_APP_BACKEND_URL}/createInvoice/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          city: parseInt(city),
          country: parseInt(country),
          amount: 100,
        }),
      });
      const { invoiceId } = await response.json();

      window.location.href = `/custom-checkout/${invoiceId}`;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <h1>Order Details</h1>
      <DetailsForm onSubmit={handleBuy} />
    </Layout>
  );
};

export default Custom;

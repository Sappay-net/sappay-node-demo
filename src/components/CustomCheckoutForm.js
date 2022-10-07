import React, { useState } from "react";

const CustomCheckoutForm = ({ onSubmit }) => {
  const [loading, setLoading] = useState(null);

  const [msisdn, setMsisdn] = useState("");
  const [otp, setOtp] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    onSubmit({
      msisdn,
      otp,
    }).then(() => {
      setLoading(false);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Orange Money Number</label>
        <input
          required
          type="text"
          name="customer_msisdn"
          placeholder="Your Orange Money number"
          value={msisdn}
          onChange={(e) => setMsisdn(e.target.value)}
        />
      </div>
      <div>
        <label>OTP</label>
        <input
          required
          type="number"
          name="otp"
          placeholder="OTP code"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
      </div>
      <button disabled={!(loading === null)} type="submit">
        {loading ? "Verifying..." : "Verify"}
      </button>
    </form>
  );
};

export default CustomCheckoutForm;

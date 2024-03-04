import React, { useState } from "react";
import logo from "../assets/coffee_icon.svg";

const DetailsForm = ({ onSubmit }) => {
  const [loading, setLoading] = useState(null);
  // form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    onSubmit({ name, email, city, country, amount: 100 }).then(() => {
      setLoading(false);
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="container">
        <span className="product">
          <img src={logo} alt="coffee icon" />
          <span>X &nbsp; 01</span>
        </span>
        <span>100.00 CFA</span>
      </div>
      <div>
        <label>Name</label>
        <input
          placeholder="Your name"
          required
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Email</label>
        <input
          placeholder="Your name"
          required
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Country</label>
        <select
          required
          name="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value="10">Choose</option>
          <option value="11">United States</option>
          <option value="12">Denmark</option>
          <option value="13">France</option>
        </select>
      </div>
      <div>
        <label>City</label>
        <select
          required
          name="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        >
          <option value="100">Choose</option>
          <option value="101">Washington</option>
          <option value="102">New York</option>
          <option value="103">Paris</option>
        </select>
      </div>

      <button disabled={!(loading === null)}>
        {loading ? "Redirecting..." : "Continue"}
      </button>
    </form>
  );
};

export default DetailsForm;

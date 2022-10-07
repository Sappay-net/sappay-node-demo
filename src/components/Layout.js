import React from "react";
import logo from "../assets/coffee_icon.svg";

const Layout = ({ children }) => {
  return (
    <div className="App">
      <header>
        <img src={logo} alt="coffe logo" />
        <h2>Coffee Shop</h2>
      </header>
      <main>{children}</main>
      <footer>
        <small>
          Developed with ♥ by <b>SAPPAY</b>
        </small>
      </footer>
    </div>
  );
};

export default Layout;

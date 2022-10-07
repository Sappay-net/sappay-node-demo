import React from "react";
import cofreeIcon from "./assets/coffee_icon.svg";
import cofee from "./assets/coffee_icon_black.svg";
import "./App.css";
import Default from "./pages/Default";
import Custom from "./pages/Custom";
import Layout from "./components/Layout";
import CustomCheckout from "./pages/CustomCheckout";
import RedirectHandler from "./pages/RedirectHandler";

function App() {
  const handleClick = (type) => {
    window.location.pathname = `/${type}`;
  };

  if (window.location.pathname === "/default") {
    return <Default />;
  }

  if (window.location.pathname === "/custom") {
    return <Custom />;
  }

  if (window.location.pathname.startsWith("/custom-checkout")) {
    return <CustomCheckout />;
  }

  if (window.location.pathname.startsWith("/redirect")) {
    return <RedirectHandler />;
  }

  return (
    <Layout>
      <h1>Checkout Demo</h1>
      <p>
        This Coffee Shop is just a demo to showcase how the user will checkout
        with SAPPAY.
      </p>
      <section>
        <img src={cofreeIcon} alt="coffee glass" />
        <div>
          <button onClick={() => handleClick("default")}>
            <img src={cofee} alt="coffee icon" />
            Buy me a Coffee (Approch 1)
          </button>
          <button onClick={() => handleClick("custom")}>
            <img src={cofee} alt="coffee icon" />
            Buy me a Coffee (Approch 2)
          </button>
        </div>
      </section>
    </Layout>
  );
}

export default App;

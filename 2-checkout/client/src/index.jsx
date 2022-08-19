import React from "react";
import { render } from "react-dom";
import App from "./components/App.jsx";


render(
  <div>
    <h2>Checkout App</h2>
    <App />
    <p>
      <code>Page Cookie: {JSON.stringify(document.cookie, undefined, "\t")}</code>
    </p>
  </div>,
  document.getElementById("root")
);

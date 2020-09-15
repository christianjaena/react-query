import React from "react";
import ReactDOM from "react-dom";

// import App from "./App";
import PaginatedApp from "./PaginatedApp";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <PaginatedApp />
  </React.StrictMode>,
  rootElement
);

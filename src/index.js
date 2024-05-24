import React from "react";
import ReactDOM from "react-dom/client";
import { appRouter } from "./router";

import { RouterProvider } from "react-router-dom";
import App from "./App";

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
  <RouterProvider router={appRouter}>
    <App />
  </RouterProvider>
);

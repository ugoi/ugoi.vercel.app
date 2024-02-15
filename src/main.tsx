import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { UgoiRouterProvider } from "./ugoi-router-provider";
import UgoiThemeProvider from "./ugoi-theme";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UgoiThemeProvider>
      <UgoiRouterProvider />
    </UgoiThemeProvider>
  </React.StrictMode>
);

import React from "react";

import { render } from "react-dom";
import "./app.css";
import { LandingPage } from "./landing";
const app = document.getElementById("app");

render(
  <div className="bg-indigo-600 h-full">
    <LandingPage />
  </div>,
  app
);

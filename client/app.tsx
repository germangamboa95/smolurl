import React from "react";

import { render } from "react-dom";
import "./app.css";
import { MainComponent } from "./main-component";
const app = document.getElementById("app");

render(
  <div className="bg-indigo-600 h-full">
    <div className="flex justify-center">
      <MainComponent />
    </div>
  </div>,
  app
);

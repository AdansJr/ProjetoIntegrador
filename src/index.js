import React from 'react';
import ReactDOM from 'react-dom/client';
import { Stack } from "./stack";
import { BrowserRouter as Router } from "react-router-dom";


ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Stack />
  </Router>,
);

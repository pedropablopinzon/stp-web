// import React from "react";
// import ReactDOM from "react-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// import App from "./components/App";

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );

import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './components/App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement!); // createRoot(container!) if you use TypeScript

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

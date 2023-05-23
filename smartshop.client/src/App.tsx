import React from "react";
import "./App.css";

import LayoutAuth from "./components/layouts/LayoutAuth";
import Router from "./routes/Router";

function App() {
  return (
    <>
      <LayoutAuth>
        <Router />
      </LayoutAuth>
    </>
  );
}

export default App;

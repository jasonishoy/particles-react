import React from "react";
import ReactDOM from "react-dom";
import Particles from "./components/Particles";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <Particles />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

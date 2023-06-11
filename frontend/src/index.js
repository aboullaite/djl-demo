import React from "react";
import ReactDOM from "react-dom";
import AudioRecorder from "./Recorder.js";

import "./style.css";

function App() {
  return (
    <div className="App">
      <h2>DJL Text to speech!</h2>
      <AudioRecorder />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

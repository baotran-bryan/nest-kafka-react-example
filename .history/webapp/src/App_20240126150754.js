import React from "react";
// import WebRTCComponent from "./WebRTCComponent";
import VideoStreamer from "./VideoStreamer";

function App() {
  return (
    <div className="App">
      {/* <WebRTCComponent /> */}
      <VideoStreamer serverUrl='ws://localhost:3000' />
    </div>
  );
}

export default App;

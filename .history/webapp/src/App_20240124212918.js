import React, { useState, useCallback, useEffect, useRef } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import "./App.css";

const WS_URL = "ws://localhost:3000";

function App() {
  useWebSocket(WS_URL, {
    onOpen: () => {
      console.log("WebSocket connection established.");
    },
    retryOnError: () => {
      console.log("WebSocket connection is not established.");
    },
  });
  const [socketUrl, setSocketUrl] = useState(WS_URL);
  const [messageHistory, setMessageHistory] = useState([]);

  const { sendJsonMessage, lastMessage, readyState } = useWebSocket(socketUrl);
  // const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error("error:", err));
  }, []);
  
  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage));
    }
  }, [lastMessage, setMessageHistory]);

  const handleClickChangeSocketUrl = useCallback(
    () => setSocketUrl(WS_URL),
    []
  );

  const handleClickSendMessage = useCallback(
    () =>
      sendJsonMessage({
        event: "live-stream",
        payload: {
          header: {
            timestamp: "2021-01-01T00:00:00.000Z",
            sequenceNumber: 12345,
            frameType: "I-frame",
            frameSize: 1024,
          },
          payload: {
            data: "<binary data>",
            encoding: "H.264",
          },
          metadata: {
            streamId: "stream123",
            width: 1920,
            height: 1080,
            bitrate: 400000,
            duration: 40,
          },
        },
      }),
    []
  );
 
  const startStreaming = () => {
    setStreaming(true);
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext("2d");

    const fps = 10;
    setInterval(() => {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const image = canvas.toDataURL("image/webp");
      socket.emit("stream", image);
    }, 1000 / fps);
  };

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];
  return (
    <div className="App">
      <span>The WebSocket is currently {connectionStatus}</span>
      <video ref={videoRef} autoPlay style={{ display: "none" }} />
      <canvas ref={canvasRef} width="640" height="480"></canvas>
      {streaming ? null : (
        <button onClick={startStreaming}>Start Streaming</button>
      )}
    </div>
  );
}

export default App;

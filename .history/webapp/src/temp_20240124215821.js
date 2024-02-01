import React, { useCallback, useEffect, useRef, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

const WS_URL = "ws://localhost:3000";

function App() {
  const [streaming, setStreaming] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const { sendMessage, lastMessage } = useWebSocket("ws://localhost:3000");

  useWebSocket(WS_URL, {
    onOpen: () => {
      console.log("WebSocket connection established.");
    },
    retryOnError: () => {
      console.log("WebSocket connection is not established.");
    },
  });

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
      const ctx = canvasRef.current.getContext("2d");
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0);
      img.src = lastMessage.data;
    }
  }, [lastMessage]);

  const startStreaming = useCallback(() => {
    setStreaming(true);
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext("2d");

    const fps = 10;
    setInterval(() => {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const image = canvas.toDataURL("image/webp");
      sendMessage(image);
    }, 1000 / fps);
  }, [sendMessage]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  return (
    <div>
      <video ref={videoRef} autoPlay style={{ display: "none" }} />
      <canvas ref={canvasRef} width="640" height="480"></canvas>
      {streaming ? null : (
        <button onClick={startStreaming}>Start Streaming</button>
      )}
    </div>
  );
}

export default App;

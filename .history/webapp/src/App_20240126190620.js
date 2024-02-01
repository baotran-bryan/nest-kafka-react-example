import React, { useCallback, useEffect, useRef, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import "./App.css";

const WS_URL = "ws://localhost:3000";

function App() {
  const [streaming, setStreaming] = useState(false);
  const [lastMessage, setLastMessage] = React.useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [setMessageHistory] = useState([]);
  const { sendMessage, sendJsonMessage, lastJsonMessage, readyState } =
    useWebSocket(WS_URL, {
      onOpen: () => {
        console.log("WebSocket connection established.");
      },
      retryOnError: () => {
        console.log("WebSocket connection is not established.");
      },
      shouldReconnect: (closeEvent) => true,
    });

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        streamVideoToServer(stream);
      })
      .catch((err) => console.error("error:", err));
  }, []);

  useEffect(() => {
    if (lastJsonMessage !== null) {
      setLastMessage(lastJsonMessage);
      startStreaming();
    }
  }, [lastJsonMessage]);

  const streamVideoToServer = (stream) => {
    const videoTracks = stream.getVideoTracks();
    if (videoTracks.length > 0) {
      const videoTrack = videoTracks[0];
      const imageCapture = new ImageCapture(videoTrack);
      console.log("imageCapture", imageCapture);

      const sendFrame = () => {
        imageCapture
          .grabFrame()
          .then((imageBitmap) => {
            // Convert the imageBitmap to a blob or another format suitable for your WebSocket server
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = imageBitmap.width;
            canvas.height = imageBitmap.height;
            ctx.drawImage(imageBitmap, 0, 0);
            canvas.toBlob((blob) => {
              const reader = new FileReader();
              reader.onloadend = () => {
                const base64Data = reader.result.split(",")[1];
                sendJsonMessage({
                  event: "offer",
                  data: base64Data,
                });
              };
              reader.readAsDataURL(blob);
            }, "image/webp");
          })
          .catch((error) => console.error("grabFrame() error:", error));
      };

      setInterval(sendFrame, 100); // Adjust the interval as needed
    }
  };

  const startStreaming = useCallback(() => {
    setStreaming(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const base64Data = `data:image/png;base64,${lastMessage}`;
    // console.log(lastMessage);
    const img = new Image();
    img.onload = () => ctx.drawImage(img, 0, 0);
    img.src = base64Data;

    canvas.toDataURL("image/webp");
  }, [lastJsonMessage]);


  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  return (
    <div>
      <span>The WebSocket is currently {connectionStatus}</span>
      <div className="wrap">
        <div>
          <video ref={videoRef} autoPlay playsInline></video>
        </div>
        <div>
          {lastMessage && <p>Last Message: {JSON.stringify(lastMessage)}</p>}
          <canvas ref={canvasRef} width="640" height="480"></canvas>
        </div>
      </div>
      <div>
        {streaming ? null : (
          <button onClick={startStreaming}>Start Streaming</button>
        )}
      </div>
    </div>
  );
}

export default App;

import React, { useCallback, useEffect, useRef, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import "./App.css";

const WS_URL = "ws://localhost:3000";

function App() {
  const [streaming, setStreaming] = useState(false);
  const [lastMessage, setLastMessage] = React.useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const { sendJsonMessage, lastJsonMessage, readyState } =
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
    if (lastJsonMessage !== null) {
      setLastMessage(lastJsonMessage);
      startStreaming();
    }
  }, [lastJsonMessage]);

  const streamVideoToServer = (stream) => {
    const sendFrame = () => {
      const data = {
        eventTime: "2024-01-29T15:30:00Z",
        eventType: "Motion Detection",
        cameraLocation: {
          name: "Main Entrance",
          coordinates: {
            latitude: 40.7128,
            longitude: -74.006,
          },
        },
        imageVideo: "event_clip.mp4",
        priorityLevel: "High",
        detectionDetails: "Image analysis for motion",
        eventDescription: "Unidentified person at the main entrance",
        cameraID: "CAM12345",
        networkInfo: {
          relatedCameras: ["CAM12346", "CAM12347"],
          networkStatus: "Online",
        },
        adminUserInfo: {
          userID: "admin01",
          notificationStatus: "Sent",
        },
        resolutionQuality: {
          resolution: "1080p",
          quality: "High",
        },
        additionalNotes: "Person wearing a red jacket",
      };

      sendJsonMessage({
        event: "live-stream",
        data: data,
      });
    };

    setInterval(sendFrame, 100);
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
          <h1>Broadcast</h1>
          <video ref={videoRef} autoPlay playsInline></video>
        </div>
        <div>
          <h1>Live stream</h1>
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

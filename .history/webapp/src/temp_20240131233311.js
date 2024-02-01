import React, { useCallback, useEffect, useRef, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import "./App.css";

const WS_URL = "ws://localhost:3000";

function App() {
  const [streaming, setStreaming] = useState(false);
  const [messages, setMessages] = React.useState([]);
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    WS_URL,
    {
      onOpen: () => {
        console.log("WebSocket connection established.");
      },
      retryOnError: () => {
        console.log("WebSocket connection is not established.");
      },
      shouldReconnect: (closeEvent) => true,
    }
  );

  useEffect(() => {
    if (lastJsonMessage !== null) {
      setMessages((prevMessages) => [...prevMessages, lastJsonMessage]);
      startStreaming();
    }
  }, [lastJsonMessage]);

  const startStreaming = useCallback(() => {
    setStreaming(true);
    const sendFrame = () => {
      const message = {
        eventTime: new Date().toISOString(),
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
        cameraID: 12312,
        networkInfo: {
          relatedCameras: [123121, 123122],
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
        data: message,
      });
    };

    setInterval(sendFrame, 100);
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
          {messages.map((message, idx) => (
            <div key={idx}>Message: {JSON.stringify(message)}</div>
          ))}
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

import React, { useState, useCallback, useEffect } from "react";
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
      }),
    []
  );

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];
  return (
    <div className="App">
      <button onClick={handleClickChangeSocketUrl}>
        Click Me to change Socket Url
      </button>
      <button
        onClick={handleClickSendMessage}
        disabled={readyState !== ReadyState.OPEN}
      >
        Click Me to send 'Hello'
      </button>
      <span>The WebSocket is currently {connectionStatus}</span>
      {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
      <ul>
        {messageHistory.map((message, idx) => (
          <span key={idx}>{console.log(message)}</span>
        ))}
      </ul>
    </div>
  );
}

export default App;

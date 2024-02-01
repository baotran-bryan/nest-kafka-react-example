import React, { useCallback, useEffect, useRef, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import io from "socket.io-client";
import "./App.css";

const WS_URL = "ws://localhost:3000";
const socket = io("http://localhost:3000");

function App() {
  const [socketUrl] = useState(WS_URL);
  const [streaming, setStreaming] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const { sendMessage, sendJsonMessage, lastMessage, readyState } =
    useWebSocket(socketUrl);
  const [setMessageHistory] = useState([]);
  const peerConnection = new RTCPeerConnection({
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  });


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
        console.log(stream);
        videoRef.current.srcObject = stream;
        streamVideoToServer(stream);
      })
      .catch((err) => console.error("error:", err));
  }, [sendJsonMessage]);

  const streamVideoToServer = (stream) => {
    const mediaRecorder = new MediaRecorder(stream);
    // Set up the RTCPeerConnection and add the stream
    const peerConnection = new RTCPeerConnection();
    stream
      .getTracks()
      .forEach((track) => peerConnection.addTrack(track, stream));

    // Create an offer and set it as the local description
    peerConnection
      .createOffer()
      .then((offer) => peerConnection.setLocalDescription(offer))
      .then(() => {
        // Send the offer to the server using WebSocket or another signaling method
        sendJsonMessage({
          event: "stream",
          data: e.data.arrayBuffer(),
        });
      });
    // mediaRecorder.ondataavailable = (e) => {
    //   // Send video data through WebSocket
    //   // socket.emit("stream-data", e.data);
    //   console.log(e.data.arrayBuffer());
    //   console.log(`Size: ${e.data.size}, Type: ${e.data.type}`);
    //   if (e.data && e.data.size > 0){
    //     sendJsonMessage({
    //       event: "stream",
    //       data: e.data.arrayBuffer(),
    //     });
    //   }
    // };
    // mediaRecorder.start(100); // Adjust the chunk size as needed
  };

  useEffect(() => {
    if (lastMessage !== null) {
      const ctx = canvasRef.current.getContext("2d");
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0);
      img.src = lastMessage.data;
    }
  }, [lastMessage]);

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage));
    }
  }, [lastMessage, setMessageHistory]);

  const startStreaming = useCallback(() => {
    setStreaming(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const fps = 10;
    setInterval(() => {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      canvas.toDataURL("image/webp");
      
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
      <span>The WebSocket is currently {connectionStatus}</span>
      <div className="wrap">
        <div>
          <video ref={videoRef} autoPlay playsInline></video>
        </div>
        <div>
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

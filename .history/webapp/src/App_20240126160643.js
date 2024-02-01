import React, { useCallback, useEffect, useRef, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import "./App.css";

const WS_URL = "ws://localhost:3000";

function App() {
  const [socketUrl] = useState(WS_URL);
  const [streaming, setStreaming] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const { sendMessage, sendJsonMessage, lastMessage, readyState } =
    useWebSocket(socketUrl);
  const [setMessageHistory] = useState([]);

  useWebSocket(WS_URL, {
    onOpen: () => { console.log("WebSocket connection established.")},
    retryOnError: () => { console.log("WebSocket connection is not established.")},
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
  }, []);

  const streamVideoToServer = (stream) => {
    // const mediaRecorder = new MediaRecorder(stream);
    // mediaRecorder.ondataavailable = (e) => {
    //   if (e.data && e.data.size > 0){
    //     sendJsonMessage({
    //       event: "offer",
    //       data: makeid(15),
    //     });
    //   }
    // };
    // mediaRecorder.start(100); // Adjust the chunk size as needed
    const videoTracks = stream.getVideoTracks();
    if (videoTracks.length > 0) {
      const videoTrack = videoTracks[0];
      const imageCapture = new ImageCapture(videoTrack);
      console.log(imageCapture)

      const sendFrame = () => {
        imageCapture
          .grabFrame()
          .then((imageBitmap) => {
            // Convert the imageBitmap to a blob or another format suitable for your WebSocket server
            // wsRef.current.send(blob);
          })
          .catch((error) => console.error("grabFrame() error:", error));
      };

      setInterval(sendFrame, 100); // Adjust the interval as needed
    }
  };

  const makeid = (length) => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  // useEffect(() => {
  //   if (lastMessage !== null) {
  //     const ctx = canvasRef.current.getContext("2d");
  //     const img = new Image();
  //     img.onload = () => ctx.drawImage(img, 0, 0);
  //     console.log("Last Message", lastMessage.data);
  //     img.src = lastMessage.data;
  //   }
  // }, [lastMessage]);

  // useEffect(() => {
  //   if (lastMessage !== null) {
  //     console.log('last message', lastMessage)
  //     setMessageHistory((prev) => prev.concat(lastMessage));
  //   }
  // }, [lastMessage, setMessageHistory]);

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

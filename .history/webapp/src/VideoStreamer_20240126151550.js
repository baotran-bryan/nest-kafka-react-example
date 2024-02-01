import React, { useEffect, useRef, useState } from "react";
import useWebsocket from "react-use-websocket";

const VideoStreamer = ({ serverUrl }) => {
  const videoRef = useRef(null);
  const wsRef = useRef(null);
  const [isStreaming, setIsStreaming] = useState(false);

  useEffect(() => {
    if (isStreaming) {
      startStreaming();
    } else {
      stopStreaming();
    }

    return () => stopStreaming();
  }, [isStreaming]);

  const startStreaming = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      wsRef.current = new WebSocket(serverUrl);

      wsRef.current.onopen = () => {
        console.log("WebSocket Client Connected");
        streamVideoToServer(stream);
      };

      wsRef.current.onclose = () => {
        console.log("WebSocket Client Disconnected");
      };
    } catch (error) {
      console.error("Error accessing the webcam", error);
    }
  };

  const stopStreaming = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    if (wsRef.current) {
      wsRef.current.close();
    }
  };

  const streamVideoToServer = (stream) => {
    const videoTracks = stream.getVideoTracks();
    if (videoTracks.length > 0) {
      const videoTrack = videoTracks[0];
      const imageCapture = new ImageCapture(videoTrack);

      const sendFrame = () => {
        imageCapture
          .grabFrame()
          .then((imageBitmap) => {
            console.log(imageBitmap);
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = imageBitmap.width;
            canvas.height = imageBitmap.height;
            ctx.drawImage(imageBitmap, 0, 0);
            canvas.toBlob((blob) => {
              // Send the blob to your WebSocket server
              // wsRef.current.send(blob);
            });
          })
          .catch((error) => console.error("grabFrame() error:", error));
      };

      setInterval(sendFrame, 10); // Adjust the interval as needed
    }
  };

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline></video>
      <button onClick={() => setIsStreaming(!isStreaming)}>
        {isStreaming ? "Stop Streaming" : "Start Streaming"}
      </button>
    </div>
  );
};

export default VideoStreamer;

import React, { useEffect, useRef, useState } from "react";
import useWebSocket from "react-use-websocket";

const WS_URL = "ws://localhost:3000";

const App = () => {
  useWebSocket(WS_URL, {
    onOpen: () => {
      console.log("WebSocket connection established.");
    },
    retryOnError: () => {
      console.log("WebSocket connection is not established.");
    },
  });
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [peerConnection, setPeerConnection] = useState(null);
  const [localStream, setLocalStream] = useState(null);

  const { sendMessage, lastMessage } = useWebSocket("ws://localhost:3000");

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        localVideoRef.current.srcObject = stream;
        handleOffer(stream);
      });

    const config = {
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    };
    const newPeerConnection = new RTCPeerConnection(config);
    console.log(newPeerConnection);
    setPeerConnection(newPeerConnection);
  }, []);

  useEffect(() => {
    console.log("lastMessage", lastMessage);
    if (!lastMessage) return;
    console.log('ssss')

    const data = JSON.parse(lastMessage.data);

    handleOffer(data);
    
  }, [lastMessage]);

  const handleOffer = async (offer) => {
    // localStream.getTracks().forEach((track) => {
    //   peerConnection.addTrack(track, localStream);
    // });

    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    peerConnection
      .createOffer()
      .then((offer) => {
        console.log("Offer created:", offer);
        // return peerConnection.setLocalDescription(offer);
      })
      .then(() => {
        // Send the offer through WebSocket
        // socket.emit("offer", peerConnection.localDescription);
        sendMessage(JSON.stringify({ event: "offer", data: 'peerConnection.localDescription' }));
        console.log("Offer sent to server");
      })
      .catch(console.error);
  };

  return (
    <div>
      <video
        ref={localVideoRef}
        autoPlay
        playsInline
        style={{ width: "480" }}
      />
      <video
        ref={remoteVideoRef}
        autoPlay
        playsInline
        style={{ width: "300px" }}
      />
    </div>
  );
};

export default App;

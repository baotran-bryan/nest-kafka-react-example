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
        setLocalStream(stream);
      });

    const config = {
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    };
    const newPeerConnection = new RTCPeerConnection(config);
    setPeerConnection(newPeerConnection);
  }, []);

  useEffect(() => {
    if (!lastMessage || !peerConnection || !localStream) return;

    const data = JSON.parse(lastMessage.data);

    if (data.type === "offer") {
      handleOffer(data);
    } else if (data.type === "answer") {
      handleAnswer(data);
    } else if (data.type === "ice-candidate") {
      handleIceCandidate(data);
    }
  }, [lastMessage, peerConnection, localStream]);

  const handleOffer = async (offer) => {
    localStream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream);
    });

    peerConnection.ontrack = (event) => {
      remoteVideoRef.current.srcObject = event.streams[0];
    };

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        sendMessage(
          JSON.stringify({ type: "ice-candidate", candidate: event.candidate })
        );
      }
    };

    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    sendMessage(JSON.stringify({ type: "answer", answer }));
    peerConnection
      .createOffer()
      .then((offer) => {
        console.log("Offer created:", offer);
        return peerConnection.setLocalDescription(offer);
      })
      .then(() => {
        // Send the offer through WebSocket
        // socket.emit("offer", peerConnection.localDescription);
        sendMessage(JSON.stringify({ event: "offer", peerConnection.localDescription }));
        console.log("Offer sent to server");
      })
      .catch(console.error);
  };

  const handleAnswer = async (answer) => {
    await peerConnection.setRemoteDescription(
      new RTCSessionDescription(answer)
    );
  };

  const handleIceCandidate = async (candidate) => {
    await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
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

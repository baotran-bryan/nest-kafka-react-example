import React, { useEffect, useRef, useState } from "react";
import useWebSocket from "react-use-websocket";

const WebRTCComponent = () => {
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
        style={{ width: "300px" }}
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

export default WebRTCComponent;
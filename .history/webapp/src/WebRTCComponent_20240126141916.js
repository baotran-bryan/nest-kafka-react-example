import React, { useRef, useEffect } from 'react';
import useWebsocket from 'react-use-websocket';

const WebRTCComponent = () => {
    const videoRef = useRef(null);
    const { sendJsonMessage } = useWebsocket('ws://localhost:3000');

    useEffect(() => {
        const startWebRTC = async () => {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
            videoRef.current.srcObject = stream;

            const peerConnection = new RTCPeerConnection();

            stream.getTracks().forEach((track) => {
                peerConnection.addTrack(track, stream);
            });

            peerConnection.onicecandidate = (event) => {
                if (event.candidate) {
                    sendJsonMessage({
                      type: "ice-candidate",
                      candidate: event.candidate,
                    });
                }
            };

            peerConnection.onnegotiationneeded = async () => {
                await peerConnection.setLocalDescription(await peerConnection.createOffer());
                sendJsonMessage({ event: 'offer', data: peerConnection.localDescription });
            };

            peerConnection.ontrack = (event) => {
                // Handle incoming video stream from remote peer
                // For example, display it in a video element
                // const remoteVideo = document.getElementById('remoteVideo');
                // remoteVideo.srcObject = event.streams[0];
            };
        };

        startWebRTC();
    }, [sendJsonMessage]);

    return <video ref={videoRef} autoPlay />;
};

export default WebRTCComponent;

import React, { useRef, useEffect } from 'react';

const VideoStream = () => {
    const videoRef = useRef(null);
    const mediaStreamRef = useRef(null);

    useEffect(() => {
        const startVideoStream = async () => {
            try {
                // Get access to the user's camera and microphone
                const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                mediaStreamRef.current = mediaStream;

                // Display the video stream in the video element
                videoRef.current.srcObject = mediaStream;

                // Connect to the server via WebRTC and transmit the video stream
                const peerConnection = new RTCPeerConnection();

                // Add the video track to the peer connection
                mediaStream.getTracks().forEach(track => {
                    peerConnection.addTrack(track, mediaStream);
                });

                // Create an offer to establish a connection with the server
                const offer = await peerConnection.createOffer();
                await peerConnection.setLocalDescription(offer);

                // Send the offer to the server using WebSocket
                const offerData = {
                    type: 'offer',
                    sdp: offer.sdp,
                };

                const socket = new WebSocket('wss://localhost:3000');
                socket.addEventListener('open', () => {
                    socket.send(JSON.stringify(offerData));
                });

                // Handle the answer from the server
                socket.addEventListener('offer', event => {
                    const answerData = JSON.parse(event.data);
                    const answer = new RTCSessionDescription({
                        type: 'answer',
                        sdp: answerData.sdp,
                    });
                    peerConnection.setRemoteDescription(answer);
                });

                // Set the remote description received from the server
                // Implement your WebSocket or signaling logic here

            } catch (error) {
                console.error('Error accessing media devices:', error);
            }
        };

        startVideoStream();

        // Cleanup function to stop the video stream when the component unmounts
        return () => {
            if (mediaStreamRef.current) {
                mediaStreamRef.current.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    
    return (
        <div>
            <video ref={videoRef} autoPlay playsInline />
        </div>
    );
};

export default VideoStream;

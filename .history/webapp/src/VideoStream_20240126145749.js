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

                // Connect to the server via WebSocket or WebRTC and transmit the video stream
                // Implement your WebSocket or WebRTC logic here

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

import { useRef } from "react";
import VideoPlayer from "./VideoPlayer";

export default function App() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const handlePlay = () => {
        if (videoRef.current ) {
            videoRef.current.play();
        }
    };
    const handlePause = () => {
        videoRef.current?.pause();
    };
    return (
        <VideoPlayer ref={videoRef}>
            <button onClick={handlePlay}>Play</button>
            <button onClick={handlePause}>Pause</button>
        </VideoPlayer>
    )
}
import { ForwardedRef, forwardRef, ReactNode } from "react";

function VideoPlayer(props: { children?: ReactNode }, videoRef: ForwardedRef<HTMLVideoElement>) {
    return (
        <>
            <video
                ref={videoRef}
                width="..."
                height="..."
                controls
                src={"..."}
            />
            {props.children}
        </>
    );
}
export default forwardRef<HTMLVideoElement, { children?: ReactNode }> (VideoPlayer);

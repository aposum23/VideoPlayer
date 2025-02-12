import React from "react";
import './assets/style.scss';
import useMachine from "./custom hooks/machineHook.ts";

const VideoModalTrigger: React.FC = () => {
    const {actor} = useMachine();

    actor.start();

    return (
        <>
            <div className="container">
            </div>
        </>
    )
}

export default VideoModalTrigger;
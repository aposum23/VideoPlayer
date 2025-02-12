import React from "react";
import '../assets/style.scss';
import { PlayCircleOutlined } from "@ant-design/icons";

interface IPlayButtonProps {
    onClick: () => void
}

const PlayerButton: React.FC<IPlayButtonProps> = (props) => {
    return (
        <>
            <div className="video-modal__button" onClick={props.onClick}>
                <PlayCircleOutlined className="video-modal__button__icon"/>
            </div>
        </>
    )
}

export default PlayerButton;
import React, {useState} from "react";
import './assets/style.scss';
import useMachine from "./custom hooks/machineHook.ts";
import { Modal, Button } from "antd";
import ReactPlayer from 'react-player'
import {
    ArrowsAltOutlined,
    CaretRightOutlined,
    PauseOutlined,
    PlayCircleOutlined,
    ShrinkOutlined
} from "@ant-design/icons";

const VideoModalTrigger: React.FC = () => {
    const { actor, currentState} = useMachine();

    const [dialogOpened, setDialogOpened] = useState<boolean>(false);
    const [isPlayVideo, setIsPlayVideo] = useState<boolean>(false);
    const openVideoModal = () => {
        setDialogOpened(true);
    };

    const handleCancel = () => {
        setDialogOpened(false);
    };

    const changeSize = () => {
        actor.current.send({type: 'toggle'});
    };

    const playAndPause = () => {
        setIsPlayVideo(!isPlayVideo);
    }

    return (
        <>
            <div className="video-modal__container">
                <div
                    className="video-modal__button"
                    onClick={openVideoModal}
                >
                    <PlayCircleOutlined className="video-modal__button__icon"/>
                </div>
            </div>
            <Modal
                className="video-modal__modal"
                open={dialogOpened}
                title="PLAYER"
                footer={[
                    <Button
                        shape="circle"
                        icon={currentState === 'full' ? <ShrinkOutlined /> : <ArrowsAltOutlined />}
                        onClick={changeSize}
                    />,
                    <Button
                        shape="circle"
                        icon={isPlayVideo ? <PauseOutlined /> : <CaretRightOutlined />}
                        onClick={playAndPause}
                    />
                ]}
                onCancel={handleCancel}
            >
                <div className="video-modal__player" id="player">
                    <ReactPlayer
                        className="video-modal__player__content"
                        width="100%"
                        height="100%"
                        url='https://cdn.flowplayer.com/d9cd469f-14fc-4b7b-a7f6-ccbfa755dcb8/hls/383f752a-cbd1-4691-a73f-a4e583391b3d/playlist.m3u8'
                        playing={isPlayVideo}
                    />
                </div>
            </Modal>
        </>
    )
}

export default VideoModalTrigger;
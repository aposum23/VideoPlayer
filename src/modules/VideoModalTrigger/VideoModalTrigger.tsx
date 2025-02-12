import React, {useState} from "react";
import './assets/style.scss';
import useMachine from "./custom hooks/machineHook.ts";
import { Modal, Button } from "antd";
import ReactPlayer from 'react-player'
import PlayerButton from "./components/PlayerButton.tsx";
import {
    ArrowsAltOutlined,
    CaretRightOutlined,
    PauseOutlined,
    ShrinkOutlined
} from "@ant-design/icons";

const VideoModalTrigger: React.FC = () => {
    const {
        actor,
        currentState,
        isPlayVideo,
        setIsPlayVideo
    } = useMachine();

    const [dialogOpened, setDialogOpened] = useState<boolean>(false);

    const openVideoModal = () => {
        setDialogOpened(true);
        actor.current.send({type: 'open'});
    };

    const handleCancel = () => {
        setDialogOpened(false);
        actor.current.send({type: 'close'});
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
                <PlayerButton onClick={openVideoModal}/>
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
                        key="resize"
                        role="button"
                    />,
                    <Button
                        shape="circle"
                        icon={isPlayVideo ? <PauseOutlined /> : <CaretRightOutlined />}
                        onClick={playAndPause}
                        key="control"
                        role="button"
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
                        loop={true}
                    />
                </div>
            </Modal>
        </>
    )
}

export default VideoModalTrigger;
import React, {useState} from "react";
import './assets/style.scss';
import useMachine from "./custom hooks/machineHook.ts";
import { Modal, Button } from "antd";
import {ArrowsAltOutlined, PlayCircleOutlined, ShrinkOutlined} from "@ant-design/icons";

const VideoModalTrigger: React.FC = () => {
    const { actor, currentState} = useMachine();

    const [dialogOpened, setDialogOpened] = useState<boolean>(false);
    const openVideoModal = () => {
        setDialogOpened(true);
    };

    const handleCancel = () => {
        setDialogOpened(false);
    };

    const changeSize = () => {
        actor.current.send({type: 'toggle'});
    };

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
                footer={[
                    <Button
                        shape="circle"
                        icon={currentState === 'full' ? <ShrinkOutlined /> : <ArrowsAltOutlined />}
                        onClick={changeSize}
                    />
                ]}
                onCancel={handleCancel}
            >
                <div className="video-modal__player" id="player">
                    example text
                </div>
            </Modal>
        </>
    )
}

export default VideoModalTrigger;
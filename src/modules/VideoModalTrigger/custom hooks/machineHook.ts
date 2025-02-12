import {createActor, createMachine} from "xstate";
import {useEffect, useRef, useState} from "react";

const useMachine = () => {
    const [currentState, setCurrentState] = useState<'closed' | 'full' | 'mini'>('closed');
    const [isPlayVideo, setIsPlayVideo] = useState<boolean>(false);

    const startVideo = () => {
        setIsPlayVideo(true);
    }

    const machine = createMachine(
        {
            id: 'player',
            initial: 'closed',
            states: {
                closed: {
                  exit: 'startVideo',
                  meta: {
                      description: 'Состояние закрытого видеоплеера'
                  },
                  on: {
                      open: 'full'
                  }
                },
                mini: {
                    meta: {
                        description: 'Видио плеер открытый в небольшом окне'
                    },
                    on: {
                        toggle: 'full',
                        close: 'closed'
                    }
                },
                full: {
                    meta: {
                        description: 'Видео открыто на полный свой размер'
                    },
                    on: {
                        toggle: 'mini',
                        close: 'closed'
                    }
                }
            }
        },
        {
            actions: {
                startVideo
            }
        }
    );

    const actor = useRef(createActor(machine));
    useEffect(() => {
        actor.current.subscribe((snapshot) => {
            const player = document.getElementsByClassName('ant-modal')[0];

            setCurrentState(snapshot.value);

            if (player)
                player.dataset.state = snapshot.value;
        })

        actor.current.start();
    });

    return {
        actor,
        currentState,
        isPlayVideo,
        setIsPlayVideo
    }
}

export default useMachine;
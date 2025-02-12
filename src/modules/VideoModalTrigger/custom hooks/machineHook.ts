import {createActor, createMachine} from "xstate";
import {useEffect, useRef, useState} from "react";

const useMachine = () => {
    const [currentState, setCurrentState] = useState<'full' | 'mini'>('full');

    const machine = createMachine(
        {
            id: 'player',
            initial: 'full',
            states: {
                mini: {
                    meta: {
                        description: 'Видио плеер открытый в небольшом окне'
                    },
                    on: {
                        toggle: 'full'
                    }
                },
                full: {
                    meta: {
                        description: 'Видео открыто на полный свой размер'
                    },
                    on: {
                        toggle: 'mini'
                    }
                }
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
        currentState
    }
}

export default useMachine;
import {createActor, createMachine} from "xstate";
import {useState} from "react";

const useMachine = () => {
    const [dialogOpened, setDialogOpened] = useState<boolean>(false);
    const [fullSize, setFullSize] = useState<boolean>(true);

    const openVideoPlayerDialog = () => {
        console.log('open');
        setDialogOpened(true)
    };

    const changeSizeToMinimal = () => {
        console.log('minimal size');
        setFullSize(false);
    };

    const changeSizeToMaximal = () => {
        console.log('maximal size');
        setFullSize(true);
    };

    const closeVideoPlayerDialog = () => {
        console.log('closed');
        setDialogOpened(false);
        setFullSize(true);
    };

    const machine = createMachine(
        {
            id: 'player',
            initial: 'closed',
            states: {
                closed: {
                    entry: 'pauseVideo',
                    meta: {
                        description: 'Закрытый видео плеер. Отображается кнопка для его открытия'
                    },
                    on: {
                        toggle: 'full'
                    }
                },
                mini: {
                    meta: {
                        description: 'Видио плеер открытый в небольшом окне'
                    },
                    on: {
                        maximize: 'full',
                        close: 'closed'
                    }
                },
                full: {
                    entry: 'playVideo',
                    meta: {
                        description: 'Видео открыто на полный свой размер'
                    },
                    on: {
                        minimize: 'mini',
                        close: 'closed'
                    }
                }
            }
        },
        {
            actions: {
                toggle: openVideoPlayerDialog,
                maximize: changeSizeToMaximal,
                minimize: changeSizeToMinimal,
                close: closeVideoPlayerDialog,
            }
        }
    );

    const actor = createActor(machine);

    actor.subscribe((snapshot) => {
        console.log('snapshot: ', snapshot);
    })

    return {
        actor,
        dialogOpened,
        fullSize,
    }
}

export default useMachine;
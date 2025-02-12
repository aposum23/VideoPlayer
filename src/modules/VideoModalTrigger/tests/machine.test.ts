import { renderHook, act } from "@testing-library/react";
import useMachine from "../custom hooks/machineHook";

describe("useMachine", () => {
    it("Меняет isPlayVideo на true при переходе из closed в full", () => {
        const { result } = renderHook(() => useMachine());

        expect(result.current.isPlayVideo).toBe(false);

        act(() => {
            result.current.actor.current.send({ type: "open" });
        });

        expect(result.current.isPlayVideo).toBe(true);
    });
    it("Значение в currentState соответствует текущему состоянию конечного автомата", () => {
        const { result } = renderHook(() => useMachine());

        expect(result.current.currentState).toBe('closed');

        act(() => {
            result.current.actor.current.send({type: 'open'});
        });

        expect(result.current.currentState).toBe('full');

        act(() => {
            result.current.actor.current.send({type: 'toggle'});
        });

        expect(result.current.currentState).toBe('mini');

        act(() => {
            result.current.actor.current.send({type: 'toggle'});
        });

        expect(result.current.currentState).toBe('full');

        act(() => {
            result.current.actor.current.send({type: 'close'});
        });

        expect(result.current.currentState).toBe('closed');
    });
    it("После закрытия с видео поставленным на паузу - должно ставить isPlayVideo === true", () => {
        const { result } = renderHook(() => useMachine());

        act(() => {
            result.current.actor.current.send({ type: "open" });
        });

        expect(result.current.isPlayVideo).toBe(true);
        
        act(() => {
            result.current.setIsPlayVideo(false);
            result.current.actor.current.send({ type: "close" });
        });

        expect(result.current.isPlayVideo).toBe(false);

        act(() => {
            result.current.actor.current.send({ type: "open" });
        });

        expect(result.current.isPlayVideo).toBe(true);
    })
});

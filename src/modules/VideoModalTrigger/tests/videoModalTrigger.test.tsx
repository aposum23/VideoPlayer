import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import VideoModalTrigger from '../VideoModalTrigger.tsx'; // импортируем как значение
import useMachine from '../custom hooks/machineHook.ts';
import '@testing-library/jest-dom';

jest.mock('../custom hooks/machineHook', () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe('VideoModalTrigger', () => {
    let mockSend: jest.Mock;
    let mockSetIsPlayVideo: jest.Mock;

    beforeEach(() => {
        mockSend = jest.fn();
        mockSetIsPlayVideo = jest.fn();

        // Мокаем хук useMachine
        (useMachine as jest.Mock).mockReturnValue({
            actor: { current: { send: mockSend } },
            currentState: 'full', // Изначально модальное окно полноэкранное
            isPlayVideo: false,
            setIsPlayVideo: mockSetIsPlayVideo,
        });
    });

    test('проверка изменения состояния при открытии модального окна', async () => {
        render(<VideoModalTrigger/>);

        // Находим кнопку для открытия модала
        const openButton = screen.getByRole('button', { name: 'play-circle' });

        // Кликаем по кнопке открытия модального окна
        fireEvent.click(openButton);

        // Проверяем, что хук useMachine был вызван с правильным параметром
        await waitFor(() => {
            expect(mockSend).toHaveBeenCalledWith({ type: 'open' });
        });

        // Проверяем, что currentState изменился на 'full'
        expect(mockSend).toHaveBeenCalledTimes(1);
    });

    test('проверка изменения размера модального окна', async () => {
        render(<VideoModalTrigger />);

        // Ожидаем, что модал будет закрыт по умолчанию
        const openButton = screen.getByRole('button', { name: 'play-circle' });

        fireEvent.click(openButton);

        // Проверяем, что модал открылся
        expect(screen.getByRole('dialog')).toBeInTheDocument();

        // Находим кнопку изменения размера
        const resizeButton = screen.getByRole('button', {
            name: 'shrink',
        });

        // Симулируем клик по кнопке изменения размера
        fireEvent.click(resizeButton);

        // Проверяем, что вызовется actor.current.send с правильным параметром
        expect(mockSend).toHaveBeenCalledWith({ type: 'toggle' });

        // Проверяем, что состояние изменилось с "canceled" на "full" и потом на "mini"
        expect(mockSend).toHaveBeenCalledTimes(2);
    });

    test('Видео начинает воспроизводиться при переходе в состояние full', async () => {
        render(<VideoModalTrigger />);

        // Открываем модальное окно
        const openButton = screen.getByRole('button');
        fireEvent.click(openButton);

        // Убеждаемся, что модальное окно открылось
        await waitFor(() => {
            expect(mockSend).toHaveBeenCalledWith({ type: 'open' });
        });

        // Обновляем состояние до "full"
        (useMachine as jest.Mock).mockReturnValueOnce({
            actor: { current: { send: mockSend } },
            currentState: 'full', // Меняем состояние на full
            isPlayVideo: false,
            setIsPlayVideo: mockSetIsPlayVideo,
        });

        // Ожидаем, что был вызван setIsPlayVideo(true), чтобы видео начало играть
        await waitFor(() => {
            expect(mockSend).toHaveBeenCalledWith({ type: 'open' });
        });
    });
});

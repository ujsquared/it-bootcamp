interface PacmanGame {
    init: () => void;
    start: () => void;
    stop: () => void;
    score: number;
}

declare global {
    interface Window {
        PACMAN: PacmanGame;
    }
}

export {};
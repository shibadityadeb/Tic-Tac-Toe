import { useState } from "react";
import confetti from "canvas-confetti";

const initialBoard = () => Array(9).fill(null);

const useTicTacToe = () => {
    const [board, setBoard] = useState(initialBoard());
    const [isXNext, setIsNext] = useState(true);

    const winning_patterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6],
    ];

    const calculateWinner = (currentBoard) => {
        for (let i = 0; i < winning_patterns.length; i++) {
            const [a, b, c] = winning_patterns[i];
            if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
                return currentBoard[a];
            }
        }
        return null;
    };

    const triggerConfetti = () => {
        confetti({
            particleCount: 200,
            spread: 90,
            origin: { y: 0.6 },
            scalar: 1.2,
            colors: ["#ff0", "#ff5733", "#33ff57", "#5733ff", "#ff33a6"],
        });
    };

    const handleClick = (index) => {
        const winner = calculateWinner(board);
        if (winner || board[index]) return;

        const newBoard = [...board];
        newBoard[index] = isXNext ? "X" : "O";
        setBoard(newBoard);
        setIsNext(!isXNext);
    };

    const get_status_message = () => {
        const winner = calculateWinner(board);
        if (winner) {
            triggerConfetti();
            return `🎉 Player ${winner} Wins!! 🎉`;
        }
        if (!board.includes(null)) return `It's a draw! 🤝`;
        return `Player ${isXNext ? "X" : "O"}'s turn!`;
    };

    const reset_game = () => {
        setBoard(initialBoard());
        setIsNext(true);
    };

    return { board, handleClick, calculateWinner, get_status_message, reset_game };
};

export default useTicTacToe;

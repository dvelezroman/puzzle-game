import { useState, useEffect } from 'react';
import { useTimer } from '../hooks/useTimer';
import { PuzzlesGame } from '../logic/index';

export const useGameState = () => {
	// to control when first move done
	const [firstMove, setFirstMove] = useState(false);

	// get instance from useTimer, to handle the timer
	const [timerState, startTimer, stopTimer, resetTimer] = useTimer();

	// get the current game state from instance
	const gameState = PuzzlesGame.getInstance();

	// create a react state from the game state instance
	const [state, setState] = useState(gameState.getGameState());

	useEffect(() => {
		if (timerState.solved) {
			stopTimer();
		}
	}, [timerState.solved]);

	// start a new game and update the react state
	const newGame = () => {
		setFirstMove(false);
		gameState.startNewGame();
		setState(gameState.getGameState());
		resetTimer();
	};

	// undo the latest move and update the react state
	const undo = () => {
		gameState.undo();
		setState(gameState.getGameState());
	};

	// return a function that will move the i-th tile
	// and update the react state
	const move = index => () => {
		if (!firstMove) {
			setFirstMove(true);
			startTimer();
		}
		gameState.moveTile(index);
		setState(gameState.getGameState());
	};

	useEffect(() => {
		// attach the keyboard event listeners to document
		document.addEventListener('keyup', function listeners(event) {
			if (event.keyCode === 37) {
				gameState.moveToDirection('left');
			} else if (event.keyCode === 38) {
				gameState.moveToDirection('up');
			} else if (event.keyCode === 39) {
				gameState.moveToDirection('right');
			} else if (event.keyCode === 40) {
				gameState.moveToDirection('down');
			}
			setState(gameState.getGameState());
		});

		// remove the event listeners when app unmounts
		return () => window.removeEventListener(listeners);
	}, [gameState]);
	// this effect hook will run only when the GameState instance changes.
	// That is, only when the app is mounted and the GameState instance
	// is created

	// expose the state and the update functions for the components
	return [timerState, state.board, state.moves, state.solved, newGame, undo, move];
};

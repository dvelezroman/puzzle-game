import {
	NUM_ROWS,
	NUM_COLS,
	SHUFFLE_MOVES_RANGE,
	NUM_TILES,
	MOVE_DIRECTIONS,
	EMPTY_INDEX,
	rand
} from '../constants';

export class PuzzlesGame {
	constructor() {
		this.startNewGame();
	}

	static instance = null;

	static getInstance() {
		if (!PuzzlesGame.instance) {
			PuzzlesGame.instance = new PuzzlesGame();
		}
		return PuzzlesGame.instance;
	}

	static getNewGame() {
		const newBoard = Array(NUM_TILES)
			.fill(0)
			.map((x, index) => [Math.floor(index / NUM_ROWS), index % NUM_COLS]);
		return newBoard;
	}

	static solvedBoard = PuzzlesGame.getNewGame();

	shuffle() {
		this.shuffling = true;
		let shuffleMoves = rand(...SHUFFLE_MOVES_RANGE);
		while (shuffleMoves-- > 0) {
			this.moveToDirection(MOVE_DIRECTIONS[rand(0, 3)]);
		}
		this.shuffling = false;
	}

	startNewGame() {
		this.moves = 0;
		this.board = PuzzlesGame.getNewGame();
		this.stack = [];
		this.shuffle();
	}

	canMove(index) {
		// if the tile index is invalid, we can not move it
		if (index < 0 || index >= NUM_TILES) {
			return false;
		}

		const tilePos = this.board[index];
		const emptyPos = this.board[EMPTY_INDEX];

		// if they are in the same row, the difference between their
		// column indices must be 1
		if (tilePos[0] === emptyPos[0]) {
			return Math.abs(tilePos[1] - emptyPos[1]) === 1;
		}

		// if they are in the same column, the difference in their
		// row indices must be 1
		else if (tilePos[1] === emptyPos[1]) {
			return Math.abs(tilePos[0] - emptyPos[0]) === 1;
		}

		// otherwise they are not adjacent
		else {
			return false;
		}
	}

	moveTile(index) {
		// if we are not shuffling, and the board is already solved,
		// then we don't need to move anything
		// Note that, the isSolved method is not defined yet
		// let's stub that to return false always, for now
		if (!this.shuffling && this.isSolved()) {
			return false;
		}

		// if the tile can not be moved in the first place ...
		if (!this.canMove(index)) {
			return false;
		}

		// Get the positions of the tile and the empty tile
		const emptyPosition = [...this.board[EMPTY_INDEX]];
		const tilePosition = [...this.board[index]];

		// copy the current board and swap the positions
		let boardAfterMove = [...this.board];
		boardAfterMove[EMPTY_INDEX] = tilePosition;
		boardAfterMove[index] = emptyPosition;

		// update the board, moves counter and the stack
		if (!this.shuffling) {
			this.stack.push(this.board);
		}
		this.board = boardAfterMove;
		if (!this.shuffling) {
			this.moves += 1;
		}

		return true;
	}

	isSolved() {
		for (let i = 0; i < NUM_TILES; i++) {
			if (
				this.board[i][0] !== PuzzlesGame.solvedBoard[i][0] ||
				this.board[i][1] !== PuzzlesGame.solvedBoard[i][1]
			)
				return false;
		}
		return true;
	}

	moveToDirection(dir) {
		// get the position of the empty square
		const epos = this.board[EMPTY_INDEX];

		// deduce the position of the tile, from the direction
		// if the direction is 'up', we want to move the tile
		// immediately below empty, if direction is 'down', then
		// the tile immediately above empty and so on
		const posToMove =
			dir === 'up'
				? [epos[0] + 1, epos[1]]
				: dir === 'down'
				? [epos[0] - 1, epos[1]]
				: dir === 'left'
				? [epos[0], epos[1] + 1]
				: dir === 'right'
				? [epos[0], epos[1] - 1]
				: epos;

		// find the index of the tile currently in posToMove
		let tileToMove = EMPTY_INDEX;
		for (let i = 0; i < NUM_TILES; i++) {
			if (this.board[i][0] === posToMove[0] && this.board[i][1] === posToMove[1]) {
				tileToMove = i;
				break;
			}
		}

		// move the tile
		this.moveTile(tileToMove);
	}

	undo() {
		if (this.stack.length === 0) {
			return false;
		}
		this.board = this.stack.pop();
		this.moves -= 1;
	}

	getGameState() {
		const self = this;

		return {
			board: self.board,
			moves: self.moves,
			solved: self.isSolved()
		};
	}
}

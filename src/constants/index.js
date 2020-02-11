export const NUM_ROWS = 3;
export const NUM_COLS = 3;
export const NUM_TILES = NUM_ROWS * NUM_COLS;
export const EMPTY_INDEX = NUM_TILES - 1;
export const SHUFFLE_MOVES_RANGE = [60, 80];
export const MOVE_DIRECTIONS = ['up', 'down', 'left', 'right'];

export const rand = (min, max) => min + Math.floor(Math.random() * (max - min + 1));

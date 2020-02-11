import React from 'react';
import { NUM_COLS, NUM_ROWS } from '../constants';

import image from '../assets/imgs/monks.jpg';

// because the picture size is 500x500
const imageSize = { height: 500, width: 500 };

const tileSize = {
	height: Math.floor(imageSize.height / 3),
	width: Math.floor(imageSize.width / 3)
};

export const Puzzle = ({ index, pos, onClick }) => {
	const top = pos[0] * tileSize.height + 5;
	const left = pos[1] * tileSize.width + 5;
	const bgLeft = (index % NUM_ROWS) * tileSize.width + 5;
	const bgTop = Math.floor(index / NUM_COLS) * tileSize.height + 5;

	return (
		<div
			onClick={onClick}
			style={{
				position: 'absolute',
				top,
				left,
				background: 'white',
				backgroundSize: `${imageSize.width} ${imageSize.height}`,
				backgroundImage: `url(${image})`,
				backgroundPosition: `-${bgLeft}px -${bgTop}px`,
				width: tileSize.width - 5,
				height: tileSize.height - 5,
				transition: `all 0.3s ease-in-out`,
				borderRadius: 2
			}}
		></div>
	);
};

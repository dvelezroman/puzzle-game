import React from 'react';
import styled from 'styled-components';
import { NUM_COLS, NUM_ROWS } from '../constants';

const image = require('../assets/imgs/monks.jpg');

// because the picture size is 500x500
const imageSize = { height: 500, width: 500 };

const tileSize = {
	height: Math.floor(imageSize.height / 3),
	width: Math.floor(imageSize.width / 3)
};

const Container = styled.div`
	position: absolute;
	background: white;
	transition: all 0.1s ease-in-out;
	border-radius: 2;
`;

export const Puzzle = ({ index, pos, onClick }) => {
	const top = pos[0] * tileSize.height + 5;
	const left = pos[1] * tileSize.width + 5;
	const bgLeft = (index % NUM_ROWS) * tileSize.width + 5;
	const bgTop = Math.floor(index / NUM_COLS) * tileSize.height + 5;

	return (
		<Container
			onClick={onClick}
			style={{
				top,
				left,
				width: tileSize.width,
				height: tileSize.height,
				backgroundImage: `url(${image})`,
				backgroundSize: `${imageSize.width} ${imageSize.height}`,
				backgroundPositionX: bgLeft,
				backgroundPositionY: bgTop
				//backgroundPosition: `-${bgLeft} -${bgTop}`
			}}
		></Container>
	);
};

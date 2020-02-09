import React from 'react';
import styled from 'styled-components';
import { Puzzle } from './Puzzle';

import image from '../assets/imgs/monks.jpg';

const Container = styled.div`
	width: 505;
	height: 505;
	position: relative;
	background: #ddd;
`;

export const Board = ({ board, moveBy, solved, children }) => {
	return (
		<Container>
			{board.slice(0, -1).map((pos, index) => (
				<Puzzle key={index} index={index} pos={pos} onClick={moveBy(index)} />
			))}
			{solved && children}
		</Container>
	);
};

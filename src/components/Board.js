import React from 'react';
import styled from 'styled-components';
import { Puzzle } from './Puzzle';

const Container = styled.div`
	width: 505;
	height: 505;
	position: relative;
	background: #ddd;
`;

export const Board = ({ board, moveBy }) => {
	return (
		<Container>
			{board.slice(0, -1).map((pos, index) => (
				<Puzzle key={index} index={index} pos={pos} onClick={moveBy(index)} />
			))}
		</Container>
	);
};

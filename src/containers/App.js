import React from 'react';
import styled from 'styled-components';
import { useGameState } from '../hooks/useGameState';
import { Board } from '../components/Board';

const Container = styled.div`
	flex: 1;
	padding-left: 20;
	padding-right: 20;
	justify-content: center;
`;

const Header = styled.div`
	flex: 1;
	justify-content: center;
	align-items: center;
`;

const SubHeader = styled.div`
	flex: 1;
	margin-top: 20;
	margin-bottom: 20;
	text-align: right;
	font-family: Arial, Helvetica, sans-serif;
`;

const Title = styled.p`
	width: 100%;
	text-align: center;
	font-size: 30;
	font-family: Arial, Helvetica, sans-serif;
`;

const Button = styled.button`
	background-color: blue;
	padding: 10;
	font-size: 16;
	color: white;
	font-family: Arial, Helvetica, sans-serif;
`;

export const App = () => {
	const [board, moves, solved, newGame, undo, move] = useGameState();
	return (
		<Container>
			<Header>
				<Title>The MediaMonk Puzzle Game</Title>
			</Header>
			<SubHeader>
				<p>{`Moves: ${moves}`}</p>
			</SubHeader>
			<SubHeader>
				<Button onClick={undo}> UNDO </Button>
			</SubHeader>
			<Board board={board} moveBy={move} />

			{!solved && (
				<div>
					<Button
						onClick={() => {
							console.log('Play again...');
						}}
					>
						PLAY AGAIN
					</Button>
				</div>
			)}
		</Container>
	);
};

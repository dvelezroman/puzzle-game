import React from 'react';
import styled from 'styled-components';
import { useGameState } from '../hooks/useGameState';
import { Board } from '../components/Board';

const Container = styled.div`
	flex: 1;
	padding-left: 20px;
	padding-right: 20px;
	justify-content: center;
`;

const Header = styled.div`
	flex: 1;
	justify-content: center;
	align-items: center;
`;

const Title = styled.p`
	width: 100%;
	text-align: center;
	font-size: 36px;
	font-family: Arial, Helvetica, sans-serif;
	font-weight: bold;
`;

const Button = styled.button`
	padding: 10px 20px;
	text-align: center;
	height: 50px;
	line-height: 30px;
	font-size: 24px;
	background: blue;
	color: white;
	border-radius: 16px;
`;

const Moves = styled.p`
	width: 150px;
	height: 24px;
	padding: 5px;
	font-family: Arial, Helvetica, sans-serif;
	position: relative;
	font-size: 24px;
`;

const Timer = styled.p`
	width: 400px;
	height: 24px;
	padding: 5px;
	font-family: Arial, Helvetica, sans-serif;
	position: relative;
	font-size: 24px;
`;

const Overlay = styled.button`
	width: 505px;
	height: 505px;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 10;
	background: #0004;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const App = () => {
	const [timerState, board, moves, solved, newGame, undo, move] = useGameState();
	return (
		<Container>
			<Header>
				<Title>The MediaMonk Puzzle Game</Title>
			</Header>
			<Moves>{`Moves: ${moves}`}</Moves>
			<Timer>{`Timer: ${timerState.time} seconds`}</Timer>
			<div style={{ flex: 1, flexDirection: 'row' }}>
				<Button onClick={undo}> UNDO </Button>
				<Button
					onClick={() => {
						newGame();
					}}
				>
					RESET
				</Button>
			</div>

			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<Board board={board} moveBy={move} solved={solved}>
					<Overlay>
						<Button
							onClick={() => {
								newGame();
							}}
						>
							PLAY AGAIN
						</Button>
					</Overlay>
				</Board>
			</div>
		</Container>
	);
};

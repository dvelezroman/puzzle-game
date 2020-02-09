import { useEffect, useState } from 'react';

export const useTimer = () => {
	const [timerState, setState] = useState({ time: 0, isOn: false });
	let interval = null;

	const startTimer = () => {
		setState({
			isOn: true,
			time: timerState.time
		});
	};

	const stopTimer = () => {
		setState({ ...timerState, isOn: false });
	};

	const resetTimer = () => {
		clearInterval(interval);
		setState(timerState => ({ ...timerState, time: 0, isOn: false }));
	};

	useEffect(() => {
		if (timerState.isOn) {
			const interval = setInterval(
				() => setState(timerState => ({ ...timerState, time: timerState.time + 1 })),
				1000
			);
			return () => clearInterval(interval);
		}
	}, [timerState]);

	return [timerState, startTimer, stopTimer, resetTimer];
};

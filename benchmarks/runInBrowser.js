import { runBenchmarks } from './benchmarks.js';

const startButton = document.getElementById('start');

startButton.addEventListener('click', async () => {
	startButton.disabled = true;
	await runBenchmarks();
	startButton.disabled = false;
});

const readline = require('readline');
const handleInput = require('./scheduler');

const currentTime = process.argv[2] || new Date().toTimeString().slice(0,5);

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: true
});

rl.on('line', (line) => {
	const result = handleInput(line, currentTime);
	console.log(result);
});
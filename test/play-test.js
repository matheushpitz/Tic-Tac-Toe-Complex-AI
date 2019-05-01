const AI = require('../index.js').createAI({player: 'O', ai: 'X', level: 'easy'});

console.log('Thinking.....');
AI.play(['', '', '', '', '', '', '', '', '']).then((pos) => {
	console.log('I will play on '+pos);
});
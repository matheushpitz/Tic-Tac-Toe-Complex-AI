const AI = require('../index.js').createAI({player: 'O', ai: 'X', level: 'expert'});

console.log('Thinking.....');
AI.play(['', '', 'O', '', 'X', '', 'O', '', '']).then((pos) => {
	console.log('I will play on '+pos);
});
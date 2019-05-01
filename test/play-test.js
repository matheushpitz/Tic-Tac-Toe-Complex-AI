const AI = require('../index.js').createAI({player: 'O', ai: 'X', level: 'medium'});

console.log('Thinking.....');
AI.play(['O', '', 'X', 'X', 'O', 'X', 'O', 'X', 'O']).then((pos) => {
	console.log('I will play on '+pos);
});
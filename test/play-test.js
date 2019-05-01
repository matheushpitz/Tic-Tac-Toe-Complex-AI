const AI = require('../index.js').createAI({player: 'O', ai: 'X', level: 'hard'});

console.log('Thinking.....');
AI.play(['O', 'X', 'O', '', 'O', 'X', 'X', 'O', 'X']).then((pos) => {
	console.log('I will play on '+pos);
});
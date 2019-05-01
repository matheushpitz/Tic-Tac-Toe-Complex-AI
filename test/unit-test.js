const assert = require('assert');
const utils = require('./test-utils.js');
const tictactoeAI = new (require('../src/AI.js'))({});

describe('TicTacToeAI', function(){
	
	it('isValidBoard Function', function() {
		// Just an array with 9 elements must be accepted.
		// Invalid arrays
		assert(!tictactoeAI.isValidBoard([]));
		assert(!tictactoeAI.isValidBoard(['', '', '', '']));
		// Valid array.
		assert(tictactoeAI.isValidBoard(['', '', '', '', '', '', '', '', '']));
	});
	
	it('isEmpty Function', function() {
		// Isn't empty
		assert(!tictactoeAI.isEmpty(tictactoeAI.config.player));
		assert(!tictactoeAI.isEmpty(tictactoeAI.config.ai));		
		// is empty
		assert(tictactoeAI.isEmpty(tictactoeAI.config.empty));
	});
	
	it('getTotalPlays Function', function() {
		// Get the configs.
		const e = tictactoeAI.config.empty;
		const p = tictactoeAI.config.player;
		// Test.
		assert(tictactoeAI.getTotalPlays([]) === 0);
		assert(tictactoeAI.getTotalPlays([e, e, e]) === 0);
		assert(tictactoeAI.getTotalPlays([e, e, e, e, e, e, e, e, e]) === 0);
		assert(tictactoeAI.getTotalPlays([e, p, e, p, e, p, e, p, e]) === 4);
	});
	
	it('getEmptyPositions', function() {
		// Get the configs.
		const e = tictactoeAI.config.empty;
		const p = tictactoeAI.config.player;
		// Test.
		assert(utils.checkArrays(tictactoeAI.getEmptyPositions([e, e, e, p, p, p, p, p, p]), [0, 1, 2]));
		assert(utils.checkArrays(tictactoeAI.getEmptyPositions([e, e, e, p, p, p, p, p, e]), [0, 1, 2, 8]));
		assert(utils.checkArrays(tictactoeAI.getEmptyPositions([p, p, p, p, p, p, p, p, p]), []));
	});
})
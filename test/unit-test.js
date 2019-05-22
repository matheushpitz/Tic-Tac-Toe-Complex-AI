const assert = require('assert');
const utils = require('./test-utils.js');

// TicTacToeAI
describe('TicTacToeAI', function() {
	// Gets AI.
	const tictactoeAI = new (require('../src/AI.js'))({});

	it('isValidBoard Function', function() {
		const p = tictactoeAI.config.player;
		// Just an array with 9 elements must be accepted.
		// Invalid arrays
		assert(!tictactoeAI.isValidBoard([]));
		assert(!tictactoeAI.isValidBoard(['', '', '', '']));
		assert(!tictactoeAI.isValidBoard([p, p, p, p, p, p, p, p, p]));
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
	
	it('getRandomPosition', function() {
		// Only one value
		let values = [1];
		assert(tictactoeAI.getRandomPosition(values) === values[0]);
		// More than one value.
		values = [1, 2, 3];
		assert(values.indexOf(tictactoeAI.getRandomPosition(values)) !== -1);
	});
	
	it('isWinPossible', function() {
		// No win
		assert(utils.checkArrays(tictactoeAI.isWinPossible(['', '', '', '', '', '', '', '', ''], 'X'), []));
		assert(utils.checkArrays(tictactoeAI.isWinPossible(['O', 'O', '', '', '', '', '', '', ''], 'X'), []));
		// Possible win
		assert(utils.checkArrays(tictactoeAI.isWinPossible(['', 'X', 'X', '', '', '', '', '', ''], 'X'), [0]));
		assert(utils.checkArrays(tictactoeAI.isWinPossible(['O', 'O', 'X', '', 'X', 'X', '', '', 'X'], 'X'), [3, 6]));
	});
	
	it('getEmptyEdges', function() {
		assert(utils.checkArrays(tictactoeAI.getEmptyEdges(['', '', '', '', '', '', '', '', '']), [0, 2, 6, 8]));
		assert(utils.checkArrays(tictactoeAI.getEmptyEdges(['X', '', 'X', '', 'X', '', '', '', 'X']), [6]));
		assert(utils.checkArrays(tictactoeAI.getEmptyEdges(['X', '', 'X', '', 'X', '', 'O', '', 'X']), []));
	});

	it('getMark', function() {
		assert(tictactoeAI.getMark(1) === tictactoeAI.config.ai);
		assert(tictactoeAI.getMark(-1) === tictactoeAI.config.player);
	});
});

// MinimaxNode
describe('MinimaxNode', function() {
	const MinimaxNode = require('../src/MinimaxNode.js');
	// root node
	let rootNode = new MinimaxNode(undefined, -1, -1, 0);
	// root's children
	let childNode = new MinimaxNode(rootNode, 0, 1, 1);
	let childNode2 = new MinimaxNode(rootNode, 1, 0, 1);
	// child2's children / root's grandChildren
	let grandChildNode = new MinimaxNode(childNode2, 0, -1, -1);
	let grandChildNode2 = new MinimaxNode(childNode2, 2, 1, -1);
	let grandChildNode3 = new MinimaxNode(childNode2, 3, 1, -1);

	it('addChild', function() {
		// Adds a child
		rootNode.addChild(childNode);
		// Checks if it has a child.
		assert(rootNode.hasChild());
	});	

	it('hasChild', function() {
		assert(rootNode.hasChild());
	});

	it('getChildren', function() {
		rootNode.addChild(childNode2);
		assert(utils.checkArrays(rootNode.getChildren(), [childNode, childNode2]));
	});

	it('getChild', function() {
		assert(rootNode.getChild(0) === childNode);
	});

	it('getEndNodes', function() {
		childNode2.addChild(grandChildNode);
		let arr = [];
		rootNode.getEndNodes(arr);
		assert(utils.checkArrays(arr, [childNode, grandChildNode]));
	});

	it('getBranchScore', function() {
		childNode2.addChild(grandChildNode2);
		childNode2.addChild(grandChildNode3);		
		assert(childNode2.getBranchScore() === (1 / 3));
	});

	it('getChildrenBranchScore', function() {
		assert(utils.checkArrays(rootNode.getChildrenBranchScore(), [1, (1 / 3)] ));
	});


});
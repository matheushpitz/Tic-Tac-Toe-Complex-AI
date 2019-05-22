const MinimaxNode = require('./MinimaxNode.js');

const WIN_POS = [
	[0, 1, 2], // horizontal line 1
	[3, 4, 5], // horizontal line 2
	[6, 7, 8], // horizontal line 3
	[0, 3, 6], // vertical column 1
	[1, 4, 7], // vertical column 2
	[2, 5, 8], // vertical column 3
	[0, 4, 8], // diagonal left-top TO right-bottom
	[6, 4, 2] // diagonal left-bottom TO right-top
];

function TicTacToeAI(config) {
	// Default AI
	this.config = {
		ai: 'O',
		player: 'X',
		empty: '',
		maxResponseTime: 5000,
		minResponseTime: 2000
	}
	
	this.config = Object.assign({}, this.config, config);
}

TicTacToeAI.prototype.isValidBoard = function(board) {
	return board !== undefined && board.length === 9 && this.getEmptyPositions(board).length > 0;
};

TicTacToeAI.prototype.isEmpty = function(elem) {
	return elem === this.config.empty;
};

TicTacToeAI.prototype.getTotalPlays = function(board) {
	let count = 0;
	board.forEach((elem) => {
		if(!this.isEmpty(elem))
			count++;		
	});
	return count;
};

TicTacToeAI.prototype.getEmptyPositions = function(board) {
	let result = [];
	board.forEach((elem, id) => {
		if(this.isEmpty(elem))
			result.push(id);
	});
	return result;
};

TicTacToeAI.prototype.getRandomPosition = function(values) {
	if(values !== undefined && values.length > 0) {
		// Only one value.
		if(values.length === 1)
			return values[0];
		
		return values[Math.trunc(Math.random() * values.length)];
		
	}
};

TicTacToeAI.prototype.delay = function() {
	return new Promise( (resolve) => {
		setTimeout(() => {
			resolve();
		}, this.config.minResponseTime + ((this.config.maxResponseTime - this.config.minResponseTime) * Math.random()));
	});
};

TicTacToeAI.prototype.isWinPossible = function(board, player) {
	let result = [];
	WIN_POS.forEach((elem) => {
	if(board[elem[0]] === board[elem[1]] && board[elem[0]] === player && board[elem[2]] === this.config.empty)
			result.push(elem[2]);
		else if(board[elem[1]] === board[elem[2]] && board[elem[1]] === player && board[elem[0]] === this.config.empty)
			result.push(elem[0]);
		else if(board[elem[0]] === board[elem[2]] && board[elem[0]] === player && board[elem[1]] === this.config.empty)
			result.push(elem[1]);
	});
	
	return result;
}

TicTacToeAI.prototype.getEmptyEdges = function(board) {
	let result = [];
	
	if(board[0] === this.config.empty)
		result.push(0);
	if(board[2] === this.config.empty)
		result.push(2);
	if(board[6] === this.config.empty)
		result.push(6);
	if(board[8] === this.config.empty)
		result.push(8);
	
	return result;
};

TicTacToeAI.prototype.getMark = function(turn) {
	return turn === 1 ? this.config.ai : this.config.player;
}

TicTacToeAI.prototype.minimax = function(board, node, turn, depth) {
	// Check if it can go more depth.
	if(depth < 1)
		return;
	
	let mark = this.getMark(turn);
	// Check if it can win in one play.
	if(turn === 1) {
		let wins = this.isWinPossible(board, mark);

		if(wins.length > 0) {
			wins.forEach((elem) => {
				let childNode = new MinimaxNode(node, elem, 1, turn);
				node.addChild(childNode);				
			});
			// returns not to calculate other plays.
			return;
		}
	}
	// Get all empty positions.
	let possiblePlays = this.getEmptyPositions(board);
	possiblePlays.forEach((elem) => {
		// Create the new board.
		let newBoard = Object.assign([], board);
		newBoard[elem] = mark;
		// Change the turn	
		let newTurn = turn * -1;		
		let newMark = this.getMark(newTurn);		
		// Get the score.
		let score = (this.isWinPossible(newBoard, newMark).length > 0 ? 1 : 0) * newTurn;	
		// Save the score.	
		let childNode = new MinimaxNode(node, elem, score, turn);
		node.addChild(childNode);		
		// Check if I don't lose, then go ahead.
		if(score > -1) {			
			// Decreases depth and calls minimax.
			let newDepth = depth - 1;
			this.minimax(newBoard, childNode, newTurn, newDepth);
		}
	});
};

TicTacToeAI.prototype.getBestPlay = function(board, depth) {
	// Create root node.
	let rootNode = new MinimaxNode(undefined, -1, 0, 0);	
	// Calculate the play tree.
	this.minimax(board, rootNode, 1, depth);
	// get the branch scores.	
	let scores = rootNode.getChildrenBranchScore();
	if(scores !== undefined && scores.length > 0) {
		// get the best score.
		let bestIdx = 0;
		let bestScore = scores[0];
		scores.forEach((elem, idx) => {
			if(elem > bestScore) {
				bestIdx = idx;
				bestScore = elem;
			}				
		});
		// Return the best play.
		return rootNode.getChild(bestIdx).getPos();
	} else {
		// Return an aleatory play.
		return this.getRandomPosition(this.getEmptyPositions(board));
	}
};

module.exports = TicTacToeAI;
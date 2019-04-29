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
	return board !== undefined && board.length === 9;
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

module.exports = TicTacToeAI;
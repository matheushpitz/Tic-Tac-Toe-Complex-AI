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
		}, (this.config.maxResponseTime - this.config.minResponseTime) * Math.random());
	});
};

module.exports = TicTacToeAI;
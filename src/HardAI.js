const ai = require('./AI.js');

function HardAI(config) {
	ai.call(this, config);
}

HardAI.prototype = Object.create(ai.prototype);

HardAI.prototype.play = function(board) {
	return new Promise( (resolve, reject) => {
		if(this.isValidBoard(board)) {
			this.delay().then(() => {
				
				if(this.getTotalPlays(board) === 0) {
					let aux = this.getEmptyEdges(board);
					if(aux.length > 0) {
						resolve(this.getRandomPosition(aux));
						return;
					}
				} else if(this.getTotalPlays(board) === 1 && this.isEmpty(board[4])) {
					// 4 = CENTER
					resolve(4);
					return;
				}
				// I win
				let aux = this.isWinPossible(board, this.config.ai);
				if(aux.length > 0) {
					resolve(this.getRandomPosition(aux));
					return;
				}
				// I try to avoid losing the round.
				aux = this.isWinPossible(board, this.config.player);
				if(aux.length > 0) {
					resolve(this.getRandomPosition(aux));
					return;
				}
				
				resolve(this.getRandomPosition(this.getEmptyPositions(board)));
				
			});
		} else {
			reject();
		}
	});
};

module.exports = HardAI;
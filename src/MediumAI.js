const ai = require('./AI.js');

function MediumAI(config) {
	ai.call(this, config);
}

MediumAI.prototype = Object.create(ai.prototype);

MediumAI.prototype.play = function(board) {
	return new Promise( (resolve, reject) => {
		if(this.isValidBoard(board)) {
			this.delay().then(() => {
				
				if(this.getTotalPlays(board) < 2) {
					resolve(this.getRandomPosition(this.getEmptyPositions(board)));
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

module.exports = MediumAI;
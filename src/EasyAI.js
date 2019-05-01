const ai = require('./AI.js');


function EasyAI(config) {
	ai.call(this, config);
}

EasyAI.prototype = Object.create(ai.prototype);

EasyAI.prototype.play = function(board) {	
	return new Promise( (resolve, reject) => {		
		if(this.isValidBoard(board)) {
			this.delay().then(() => {		
				// Only makes random plays.
				resolve(this.getRandomPosition(this.getEmptyPositions(board)));
			});
		} else {
			reject();
		}
	});	
}

module.exports = EasyAI;
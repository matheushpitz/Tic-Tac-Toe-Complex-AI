const ai = require('./AI.js');


function EasyAI(config) {
	ai.call(this, config);
}

EasyAI.prototype = Object.create(ai.prototype);

EasyAI.prototype.play = function(board) {	
	return new Promise( (resolve, reject) => {		
		if(this.isValidBoard(board)) {
			resolve();
		} else {
			reject();
		}
	});	
}

module.exports = EasyAI;
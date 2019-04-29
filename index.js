const easyAI = require('./src/EasyAI.js');

function createAI(config) {
	if(config !== undefined && config.level !== undefined) {
		switch(config.level) {
			case 'easy':
				return new easyAI(config);
			default:
				return new easyAI(config);
		}
	}
}

module.exports.createAI = createAI;
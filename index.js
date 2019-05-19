const EasyAI = require('./src/EasyAI.js');
const MediumAI = require('./src/MediumAI.js');
const HardAI = require('./src/HardAI.js');
const ExpertAI = require('./src/ExpertAI.js');

function createAI(config) {
	if(config !== undefined && config.level !== undefined) {
		switch(config.level) {
			case 'easy':
				return new EasyAI(config);
			case 'medium':
				return new MediumAI(config);
			case 'hard':
				return new HardAI(config);
			case 'expert':
				return new ExpertAI(config);
			default:
				return new EasyAI(config);
		}
	}
}

module.exports.createAI = createAI;
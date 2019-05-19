const HardAI = require('./HardAI.js');

function ExpertAI(config) {
    HardAI.call(this, config);
}

ExpertAI.prototype = Object.create(HardAI.prototype);

ExpertAI.prototype.play = function(board) {
    return this.defaultPlay(board, 9);
};

module.exports = ExpertAI;
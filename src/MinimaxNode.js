function MinimaxNode(parentNode, pos, score, turn) {
    this.parentNode = parentNode;
    this.pos = pos;
    this.score = score;
    this.turn = turn;
    this.childNodes = [];
};

MinimaxNode.prototype.addChild = function(node) {
    this.childNodes.push(node);
};

MinimaxNode.prototype.hasChild = function() {
    return this.childNodes.length > 0;
};

MinimaxNode.prototype.getChildren = function() {
    return this.childNodes;
};

MinimaxNode.prototype.getChild = function(index) {
    return this.childNodes[index];
};

MinimaxNode.prototype.toString = function() {
    // Criar toString utilizando objetos e stringify.
}

module.exports = MinimaxNode;
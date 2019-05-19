function MinimaxNode(parentNode, pos, score, turn) {
    this.parentNode = parentNode;
    this.pos = pos;
    this.score = score;
    this.turn = turn;
    this.childNodes = [];
    // Checks if it is a root node.
    if(parentNode === undefined)
        this.setRoot();
};

MinimaxNode.prototype.setRoot = function() {
    this.isRoot = true;
}

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

MinimaxNode.prototype.getScore = function() {
    return this.score;
}

MinimaxNode.prototype.getPos = function() {
    return this.pos;
};

MinimaxNode.prototype.getEndNodes = function(arr) {   
    if(!this.hasChild())
        arr.push(this);
    this.getChildren().forEach((elem) => {
        elem.getEndNodes(arr);
    });    
};

MinimaxNode.prototype.getBranchScore = function() {
    let endNodes = [];
    this.getEndNodes(endNodes);    
    let sum = endNodes.reduce((acc, elem) => acc + elem.getScore(), 0);
    return sum / endNodes.length;
};

MinimaxNode.prototype.getChildrenBranchScore = function() {
    let arr = [];
    this.getChildren().forEach((elem) => {
        arr.push(elem.getBranchScore());
    });
    return arr;
};

MinimaxNode.prototype.toObject = function() {
    let myObj = {
        pos: this.pos,
        score: this.score,
        turn: this.turn,
        childNodes: []
    };

    this.childNodes.forEach((elem) => {
        myObj.childNodes.push(elem.toObject());
    });

    return myObj;
};

MinimaxNode.prototype.toString = function() {
    return JSON.stringify(this.toObject());
};

module.exports = MinimaxNode;
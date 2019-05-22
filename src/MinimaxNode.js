function MinimaxNode(parentNode, pos, score, turn) {
    // Save the variables.
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
    // If it doesn't have children, put this on the array.
    if(!this.hasChild()) {
        arr.push(this);   
        return;
    } 
    // If it has children, get its endNodes.
    this.getChildren().forEach((elem) => {
        elem.getEndNodes(arr);
    });    
};

MinimaxNode.prototype.getBranchScore = function() {
    // Get the end nodes of this node.    
    let endNodes = [];
    this.getEndNodes(endNodes);    
    // Calculate the average score and returns it.
    return endNodes.reduce((acc, elem) => acc + elem.getScore(), 0) / endNodes.length;    
};

MinimaxNode.prototype.getChildrenBranchScore = function() {
    // Gets the node's children branch score and saves it inside an array.
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
const ai = require('../src/AI.js');

let obj = {};
let instance = new ai({});

instance.calculatePaths(['X', 'X', 'X', 'X', 'X', 'X', 'x', '', ''], obj, 1, 2);

console.log(obj);
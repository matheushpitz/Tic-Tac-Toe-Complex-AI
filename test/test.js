const ai = require('../src/AI.js');

let instance = new ai({});

instance.getBestPlay(['X', '', 'O', '', 'X', '', '', '', ''], 9);
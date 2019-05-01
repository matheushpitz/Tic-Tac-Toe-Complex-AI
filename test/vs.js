const ai1 = require('../index.js').createAI({level: 'hard', player: 'X', ai: 'O', empty: '-'});
const ai2 = require('../index.js').createAI({level: 'medium', player: 'O', ai: 'X', empty: '-'});

let plays = 0;
let turn = 1;
let board = ['-', '-', '-', '-', '-', '-', '-', '-', '-'];

function play(board) {
	if(plays < 9) {
		plays++;
		if(turn === 1) {
			ai1.play(board).then((pos) => {
				board[pos] = ai1.config.ai;
				showBoard(board, 1);
				play(board);
			});
		} else {
			ai2.play(board).then((pos) => {
				board[pos] = ai2.config.ai;
				showBoard(board, 2);
				play(board);
			});
		}
		turn *= -1;
	}
}

function showBoard(board, player) {
	console.log('Play '+ plays + ' - Player' + player);
	console.log('####################');
	console.log(board[0] + ' ' + board[1] + ' ' + board[2]);
	console.log(board[3] + ' ' + board[4] + ' ' + board[5]);
	console.log(board[6] + ' ' + board[7] + ' ' + board[8]);
	console.log('####################');
}

console.log('Starting game');
play(board);
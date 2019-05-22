const ai = require('../index.js');

const playMatches = (p1Level, p2Level, matches) => {
	// Player one
	const p1 = ai.createAI({
		level: p1Level,
		player: 'X',
		ai: 'O',
		empty: '',
		minResponseTime: 0,
		maxResponseTime: 0
	});
	// Player two
	const p2 = ai.createAI({
		level: p2Level,
		player: 'O',
		ai: 'X',
		empty: '',
		minResponseTime: 0,
		maxResponseTime: 0
	});
	// Match results
	let matchResults = [];
	// variables.
	let matchesToStart = matches;
	let matchesFinished = 0;
	// Who is the play that is gonna play? 1 = player1 and -1 = player2.
	let turn = 1;

	const isGameFinished = (board, player) => {	
		// Checks for winning			
		if(board[0] === board[1] && board[1] === board[2] && board[2] === player)
			return 1;
		if(board[3] === board[4] && board[4] === board[5] && board[5] === player)
			return 1;
		if(board[6] === board[7] && board[7] === board[8] && board[8] === player)
			return 1;
		if(board[0] === board[3] && board[3] === board[6] && board[6] === player)
			return 1;
		if(board[1] === board[4] && board[4] === board[7] && board[7] === player)
			return 1;
		if(board[2] === board[5] && board[5] === board[8] && board[8] === player)
			return 1;
		if(board[0] === board[4] && board[4] === board[8] && board[8] === player)
			return 1;
		if(board[2] === board[4] && board[4] === board[6] && board[6] === player)
			return 1;	
		// Checks for draw	
		if(board.every((elem) => elem !== p1.config.empty))
			return 0;

		return -1;
	}

	const finishGame = () => {
		let wins = 0;
		let loses = 0;
		let draws = 0;
		matchResults.forEach(elem => {
			if(elem == 1)
				wins++;
			else if(elem == 0)
				draws++;
			else
				loses++;
		});

		console.log('Player 1 won '+wins+' matches and lost '+loses+' matches');
		console.log('Player 2 won '+loses+' matches and lost '+wins+' matches');
		console.log(draws+' draws have happened');
	}

	const play = (board, turn) => {
		// Get the player.
		let player = turn == 1 ? p1 : p2;
		// AI plays.
		player.play(board).then(pos => {
			// Writes on the board.
			board[pos] = player.config.ai;
			// Checks if the game is finished.
			let isFinished = isGameFinished(board, player.config.ai);	
			// Finish the game.	
			if(isFinished !== -1) {
				matchesFinished++;
				matchResults.push(isFinished * turn);
				if(matchesFinished === matches) {					
					finishGame();
				}
			} else {
				// Changes the AI and plays again.
				play(board, turn * -1);
			}
		});		
	}	
	// Starts the games
	while(matchesToStart > 0) {
		// Calls play with an empty board.
		play(['', '', '', '', '', '', '', '', ''], turn);
		// Changes the turn
		turn = turn * -1;		
		matchesToStart--;
	}
}

playMatches('hard', 'medium', 1000);
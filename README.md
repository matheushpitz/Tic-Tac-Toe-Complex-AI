# Tictactoe Complex AI

This is a **Complex Powerful JavaScript AI** for the **Tic Tac Toe** Game. 

## How to install

To install this package on NPM, use the follow command:
```
npm install tictactoe-complex-ai
```
or on Yarn:
```
yarn install tictactoe-complex-ai
```

## How to use

Using this AI is quite simple, you just have to require the package and then you can call **createAI** to create a new AI instance, like the example below:
```
const ai = require('tictactoe-complex-ai');

let aiInstance = ai.createAI({level: 'easy'});
```
The createAI function requires a config parameter that will be used to configure the AI (We will talk about it on the next topic). After you created a new instance, you can call the play function passing the current board to make the play, as you can see here:
```
const ai = require('tictactoe-complex-ai');

let aiInstance = ai.createAI({level: 'easy'});
const board = ['', '', '', '', '', '', '', '', ''];
aiInstance.play(board).then(pos => {
  console.log('AI plays on the position '+pos);
}).catch(() => {
  console.log('An error occurred.');
});
```
## How to configure the AI

The config parameter is a Object with these properties:

* **level (required)** - It is a String which means what level the AI will use on the instance. There are 4 levels, **easy**, **medium**, **hard** and **expert**.

* **ai** - It is a String that means what character represents the AI on the board. **Default value is 'O'**.

* **player** - It is a String that means what character represents the Player (Enemy's AI) on the board. **Default value is 'X'**.

* **empty** - It is a String that means what character represents an empty space on the board. **Default value is ''**.

* **minResponseTime** - It is an Integer that means the minimum time (in milliseconds) it will take to make the play. **Default value is 2000**.

* **maxResponseTime** - It is an Integer that means the maximum time (in milliseconds) it will take to make the play. **Default value is 5000**.

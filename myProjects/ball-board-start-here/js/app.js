var WALL = 'WALL';
var FLOOR = 'FLOOR';
var GLUE = 'GLUE'
var BALL = 'BALL';
var GAMER = 'GAMER';


var GLUE_IMG = ' <img src="img/candy.png" />';
var GAMER_IMG = '<img src="img/gamer.png" />';
var BALL_IMG = '<img src="img/ball.png" />';
var newBallInterval;
var newGlueInterval;
var gBoard;
var gGamerPos;
var gCollectCount = 0;
var elBtn = document.querySelector('.reset');
var elSpanH2 = document.querySelector('.collectSum');
var elH3 = document.querySelector('.modal');
var gPassages = [];


function initGame() {
	gGamerPos = { i: 2, j: 9 };
	gBoard = buildBoard();
	setPasseges(gBoard);
	renderBoard(gBoard);
	randomCellBall(gBoard);
	gameElementGLUE(gBoard);
}

function reset() {
	initGame();
	elBtn.style.display = 'none';
	gCollectCount = 0;
	elSpanH2.innerText = gCollectCount;
	elH3.style.display = 'none';

}

function buildBoard() {
	// Create the Matrix
	var board = createMat(10, 12)


	// Put FLOOR everywhere and WALL at edges
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[0].length; j++) {
			// Put FLOOR in a regular cell
			var cell = { type: FLOOR, gameElement: null };

			// Place Walls at edges
			if (i === 0 || i === board.length - 1 || j === 0 || j === board[0].length - 1) {
				cell.type = WALL;
			}

			// Add created cell to The game board
			board[i][j] = cell;
		}
	}

	// Place the gamer at selected position
	board[gGamerPos.i][gGamerPos.j].gameElement = GAMER;

	// Place the Balls (currently randomly chosen positions)
	board[3][8].gameElement = BALL;
	board[7][4].gameElement = BALL;

	console.log(board);
	return board;
}

// Render the board to an HTML table
function renderBoard(board) {

	var strHTML = '';
	for (var i = 0; i < board.length; i++) {
		strHTML += '<tr>\n';
		for (var j = 0; j < board[0].length; j++) {
			var currCell = board[i][j];

			var cellClass = getClassName({ i: i, j: j })

			//change to short if statement
			cellClass = (currCell.type === FLOOR) ? cellClass += ' floor' : cellClass += ' wall';

			//Change To template string
			strHTML += `\t<td class="cell  ${cellClass}  
				"  onclick="moveTo(${i},${j})" >\n`;

			// change to switch case statement
			switch (currCell.gameElement) {
				case GAMER:
					strHTML += GAMER_IMG;
					break;
				case BALL:
					strHTML += BALL_IMG;
					break;
			}


			strHTML += '\t</td>\n';
		}
		strHTML += '</tr>\n';
	}

	console.log('strHTML is:');
	console.log(strHTML);
	var elBoard = document.querySelector('.board');
	elBoard.innerHTML = strHTML;
}

// Move the player to a specific location
function moveTo(i, j) {

	var targetCell = gBoard[i][j];
	if (targetCell.type === WALL) return;

	// Calculate distance to make sure we are moving to a neighbor cell
	var iAbsDiff = Math.abs(i - gGamerPos.i);
	var jAbsDiff = Math.abs(j - gGamerPos.j);

	// If the clicked Cell is one of the four allowed
	if ((iAbsDiff === 1 && jAbsDiff === 0) || (jAbsDiff === 1 && iAbsDiff === 0)) {
		if (i === gPassages[3].i && j === gPassages[3].j) {
			i = gPassages[2].i
		} else if (i === gPassages[2].i && j === gPassages[2].j) {
			i = gPassages[3].i
		} else if (i === gPassages[1].i && j === gPassages[1].j) {
			j = gPassages[0].j
		} else if (i === gPassages[1].i && j === gPassages[0].j) {
			j = gPassages[1].j
		}
		
			if (targetCell.gameElement === BALL) {
				var audioPlay = new Audio('img/popSound.wav');
				audioPlay.play();
				console.log('Collecting!');
				gCollectCount++;

				elSpanH2.innerText = gCollectCount;

			} else if (targetCell.gameElement === GLUE) {
			var	gFreeze = true;
				setInterval(() => {gFreeze = false},3000);
			}

			// MOVING from current position
			// Model:
			gBoard[gGamerPos.i][gGamerPos.j].gameElement = null;
			// Dom:
			renderCell(gGamerPos, '');

			// MOVING to selected position
			// Model:
			gGamerPos.i = i;
			gGamerPos.j = j;
			gBoard[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
			if (checkEmptyCell(gBoard)) {
				clearInterval(newBallInterval);
				clearInterval(newGlueInterval);
				elH3.style.display = 'block';
				elBtn.style.display = 'block';
			}
			// DOM:

			renderCell(gGamerPos, GAMER_IMG);

		} //else console.log('TOO FAR', iAbsDiff, jAbsDiff);

	

}

// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
	var cellSelector = '.' + getClassName(location)
	var elCell = document.querySelector(cellSelector);
	elCell.innerHTML = value;
}

// Move the player by keyboard arrows
function handleKey(event) {

	var i = gGamerPos.i;
	var j = gGamerPos.j;
	while (gBoard[i][j].gameElement === GLUE) return;

	switch (event.key) {
		case 'ArrowLeft':
			moveTo(i, j - 1);
			break;
		case 'ArrowRight':
			moveTo(i, j + 1);
			break;
		case 'ArrowUp':
			moveTo(i - 1, j);
			break;
		case 'ArrowDown':
			moveTo(i + 1, j);
			break;

	}

}

// Returns the class name for a specific cell
function getClassName(location) {
	var cellClass = 'cell-' + location.i + '-' + location.j;
	return cellClass;
}


function checkEmptyCell(board) {

	for (var i = 1; i < board.length - 1; i++) {
		for (var j = 1; j < board[0].length - 1; j++) {
			if (board[i][j].gameElement && board[i][j].gameElement !== GAMER && board[i][j].gameElement !== GLUE) {
				return false;
			}

		}
	}
	return true;
}

function setPasseges(board) {
	var passages = [{
		i: gBoard.length / 2,
		j: 0
	}
		, {
		i: gBoard.length / 2,
		j: gBoard[0].length - 1
	}
		, {
		i: 0,
		j: gBoard[0].length / 2
	}
		, {
		i: gBoard.length - 1,
		j: gBoard[0].length / 2
	}]

	for (var i = 0; i < passages.length; i++) {

		board[passages[i].i][passages[i].j].type = FLOOR;
	}
	gPassages = passages.slice();
	return board;

}
function stepOnGlue(i, j) {
	if (gBoard[i][j].gameElement === GLUE) {
		return true;
	}
	return false;
}
function gameElementGLUE(board) {
	var jBoard;
	var iBoard;
	newGlueInterval = setInterval(function () {
		jBoard = Math.floor(Math.random() * (board[0].length - 2)) + 1;
		iBoard = Math.floor(Math.random() * (board.length - 2)) + 1;
		if (board[iBoard][jBoard].gameElement) {
			jBoard = Math.floor(Math.random() * (board[0].length - 2)) + 1;
			iBoard = Math.floor(Math.random() * (board.length - 2)) + 1;
		} else {
			board[iBoard][jBoard].gameElement = GLUE;
			var newPos = {
				i: iBoard,
				j: jBoard
			}
			renderCell(newPos, GLUE_IMG)
		}
	}, 5000)
}
function randomCellBall(board) {
	var jBoard;
	var iBoard;
	newBallInterval = setInterval(function () {
		jBoard = Math.floor(Math.random() * (board[0].length - 2)) + 1;
		iBoard = Math.floor(Math.random() * (board.length - 2)) + 1;
		if (board[iBoard][jBoard].gameElement) {
			jBoard = Math.floor(Math.random() * (board[0].length - 2)) + 1;
			iBoard = Math.floor(Math.random() * (board.length - 2)) + 1;
		} else {
			board[iBoard][jBoard].gameElement = BALL;
			var newPos = {
				i: iBoard,
				j: jBoard
			}
			renderCell(newPos, BALL_IMG)
		}
	}, 5000)
}


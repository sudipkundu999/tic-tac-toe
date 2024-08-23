const buttons = document.querySelectorAll('#tic-tac-toe button');
const currentPlayerMessage = document.getElementById('current-player');
const resetButton = document.getElementById('reset-btn');

const PLAYERS = ['🐒', '🐇'];
let currentPlayer = PLAYERS[0];
let currentGame = new Array(3).fill().map((_) => Array(3).fill(null));
let movesPlayed = 0;

resetButton.addEventListener('click', startNewGame);
function hideResetButton() {
  resetButton.style.visibility = 'hidden';
}
function showResetButton() {
  resetButton.style.visibility = 'visible';
}

function startNewGame() {
  buttons.forEach((button) => {
    button.disabled = false;
    button.textContent = '';
    button.classList.remove('winner-tile');
  });
  currentGame = new Array(3).fill().map((_) => Array(3).fill(null));
  movesPlayed = 0;
  hideResetButton();
  currentPlayer = PLAYERS[0];
  updateCurrentPlayerUI();
}

buttons.forEach((button, index) =>
  button.addEventListener('click', (event) => handlePlayerMove(event, index))
);

function handlePlayerMove(event, index) {
  event.target.textContent = currentPlayer;
  event.target.disabled = true;
  movesPlayed++;
  showResetButton();
  updateCurrentGame(currentPlayer, index);
  const winningIndexes = evaluateCurrentGame();
  if (winningIndexes.length) {
    handlePlayerWon(winningIndexes);
  } else if (movesPlayed === 9) {
    handleGameDraw();
  } else {
    switchPlayer();
  }
}

function handleGameDraw() {
  currentPlayerMessage.textContent = `Game ended in a DRAW`;
}

function handlePlayerWon(winningIndexes) {
  currentPlayerMessage.textContent = `🎉 winner is ${currentPlayer}`;
  buttons.forEach((button, index) => {
    button.disabled = true;
    if (winningIndexes.includes(index)) {
      button.classList.add('winner-tile');
    }
  });
}

function getIndex(row, column) {
  return Math.round(row * 3) + column;
}

function updateCurrentGame(currentPlayer, index) {
  const row = Math.floor(index / 3);
  const column = index % 3;
  currentGame[row][column] = currentPlayer;
}

function switchPlayer() {
  currentPlayer = currentPlayer === PLAYERS[0] ? PLAYERS[1] : PLAYERS[0];
  updateCurrentPlayerUI();
}

function updateCurrentPlayerUI() {
  currentPlayerMessage.textContent = `Current turn : ${currentPlayer}`;
}

function evaluateCurrentGame() {
  // to handle double winning scenario. (ex. L or X)
  let winningIndexes = [];
  //check row
  for (let row = 0; row < 3; row++) {
    if (
      currentGame[row][0] === currentPlayer &&
      currentGame[row][1] === currentPlayer &&
      currentGame[row][2] === currentPlayer
    ) {
      winningIndexes = [
        ...winningIndexes,
        getIndex(row, 0),
        getIndex(row, 1),
        getIndex(row, 2),
      ];
    }
  }

  //check column
  for (let column = 0; column < 3; column++) {
    if (
      currentGame[0][column] === currentPlayer &&
      currentGame[1][column] === currentPlayer &&
      currentGame[2][column] === currentPlayer
    ) {
      winningIndexes = [
        ...winningIndexes,
        getIndex(0, column),
        getIndex(1, column),
        getIndex(2, column),
      ];
    }
  }

  //check diagonal
  if (
    currentGame[0][0] === currentPlayer &&
    currentGame[1][1] === currentPlayer &&
    currentGame[2][2] === currentPlayer
  ) {
    winningIndexes = [
      ...winningIndexes,
      getIndex(0, 0),
      getIndex(1, 1),
      getIndex(2, 2),
    ];
  }

  if (
    currentGame[0][2] === currentPlayer &&
    currentGame[1][1] === currentPlayer &&
    currentGame[2][0] === currentPlayer
  ) {
    winningIndexes = [
      ...winningIndexes,
      getIndex(0, 2),
      getIndex(1, 1),
      getIndex(2, 0),
    ];
  }

  return winningIndexes;
}

updateCurrentPlayerUI();
hideResetButton();

const board = document.getElementById("board");
const cells = document.querySelectorAll("[data-cell]");
const winnerMessage = document.getElementById("winner-message");
const drawMessage = document.getElementById("draw-message");
const winnerText = document.getElementById("winner");
const restartButton = document.getElementById("restart");

let currentPlayer = "x"; // Start with player "X"
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const handleCellClick = (e) => {
  const cell = e.target;

  // Place current player's mark
  cell.classList.add(currentPlayer);
  cell.textContent = currentPlayer.toUpperCase();

  // Check for a win or draw
  if (checkWin(currentPlayer)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
  }
};

const checkWin = (player) => {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cells[index].classList.contains(player);
    });
  });
};

const isDraw = () => {
  return [...cells].every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("o");
  });
};

const endGame = (isDraw) => {
  if (isDraw) {
    drawMessage.classList.remove("hidden");
  } else {
    winnerText.textContent = currentPlayer.toUpperCase();
    winnerMessage.classList.remove("hidden");
  }
  disableBoard();
};

const swapTurns = () => {
  currentPlayer = currentPlayer === "x" ? "o" : "x";
};

const disableBoard = () => {
  cells.forEach((cell) => {
    cell.removeEventListener("click", handleCellClick);
  });
};

const startGame = () => {
  currentPlayer = "x";
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("x", "o");
    cell.addEventListener("click", handleCellClick, { once: true });
  });
  winnerMessage.classList.add("hidden");
  drawMessage.classList.add("hidden");
};

// Restart the game
restartButton.addEventListener("click", startGame);

// Initialize the game
startGame();
//1.create gamebord module
const Gameboard = (() => {
  const turnPlayers = document.getElementById("turn-players");
  const board = ["", "", "", "", "", "", "", "", ""];
  const boardElemenet = document.getElementById("game-board");
  const getBoard = () => board;
  const handleclick = (e) => {
    if (document.getElementById("display-winners").textContent !== "") {
      return;
    }
    e.target.textContent = gameController.switchPlayer();

    turnPlayers.textContent = "It is now " + e.target.textContent + "'s go.";
    e.target.removeEventListener("click", handleclick);

    gameController.checkWinners();
  };

  const createBoard = () => {
    board.forEach((_cell, index) => {
      const cellElement = document.createElement("div");
      cellElement.classList.add("square");
      cellElement.id = index;
      boardElemenet.appendChild(cellElement);
      cellElement.addEventListener("click", handleclick);
    });
  };
  const resetBoard = () => {
    // Clear the board
    board.fill("");
    boardElemenet.innerHTML = "";

    // Recreate the board
    createBoard();
    turnPlayers.textContent = "";
    document.getElementById("display-winners").textContent = "";
  };

  return {
    getBoard,
    createBoard,
    boardElemenet,
    handleclick,
    resetBoard,
  };
})();

Gameboard.createBoard();

//Create Players

const Player = (name, marker) => {
  const getName = () => name;
  const getMarker = () => marker;
  return {
    getName,
    getMarker,
  };
};

//2.start the game with filling corresponding markes

const gameController = (() => {
  const displayWinner = document.getElementById("display-winners");
  const player1 = Player("Player-X", "X");
  const player2 = Player("Player-O", "O");
  let currentPlayer = player2;
  const switchPlayer = () => {
    if (currentPlayer === player2) {
      currentPlayer = player1;
      return currentPlayer.getMarker();
    } else {
      currentPlayer = player2;
      return currentPlayer.getMarker();
    }
  };

  const checkWinners = () => {
    const winningCombos = [
      [0, 1, 2], // top row
      [3, 4, 5], // middle row
      [6, 7, 8], // bottom row
      [0, 3, 6], // left column
      [1, 4, 7], // middle column
      [2, 5, 8], // right column
      [0, 4, 8], // top-left to bottom-right diagonal
      [2, 4, 6], // top-right to bottom-left diagonal
    ];

    const board = Array.from(Gameboard.boardElemenet.children);
    const currentPlayerMarker = currentPlayer.getMarker();

    // Loop through each winning combination and check if every cell in the combination
    // has the same marker as the current player.
    for (let i = 0; i < winningCombos.length; i++) {
      const combo = winningCombos[i];
      const comboCells = combo.map((index) => board[index]);

      // Check if every cell in the combination has the same marker as the current player.
      const isWinner = comboCells.every(
        (cell) => cell.textContent === currentPlayerMarker
      );

      // If the current player has achieved a winning combination, return true and exit the loop.

      if (isWinner) {
        const winner = `GAME OVER!!!${currentPlayer.getName()} wins!`;
        displayWinner.textContent = winner;
      } else if (board.every((cell) => cell.textContent !== "")) {
        displayWinner.textContent = "CAME OVER:Tie!";
      }
    }

    // If none of the winning combinations have been achieved, return false.
    return false;
  };

  return {
    switchPlayer,
    checkWinners,
  };
})();

const Reset = (() => {
  const rstButton = document.getElementById("button");
  rstButton.addEventListener("click", function reset() {
    Gameboard.resetBoard();
  });
})();

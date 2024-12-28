const gameboard = (function() {
  let board = Array(3).fill('').map(() => Array(3).fill('.'));
  const showBoard = () => board;
  const placeMark = (mark, row, col) => board[row][col] = mark;
  const resetBoard = () => board = Array(3).fill('').map(() => Array(3).fill('.'));
  return { showBoard, placeMark, resetBoard };
})();

function createPlayer(name, marker) {
  return {
    name: name,
    marker: marker,
  }
}


gameboard.placeMark("X", 0, 0);
gameboard.placeMark("X", 0, 1);
gameboard.showBoard();
gameboard.resetBoard();
gameboard.showBoard();

let player1 = createPlayer("Pedro", "X");
let player2 = createPlayer("Jairo", "O");
console.log(player1.name);

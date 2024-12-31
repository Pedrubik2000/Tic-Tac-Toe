const gameboard = (function() {
  let board = Array(3).fill('').map(() => Array(3).fill('.'));
  const showBoard = () => board;
  const isValid = (row, col) => (board[row][col] === '.') ? true : false;
  const placeMark = (mark, row, col) => {
    if (isValid(row, col)) {
      board[row][col] = mark
      if (isWin(mark)) {
        return `You win`
      } else {
        return `Nice move`
      }
    }
    else {
      return `That cell is occupied`
    }
  };
  const isWin = (mark) => {
    return diagonalWin(mark)
  };
  const diagonalWin = (mark) => {
    if (mark === board[0][0] && mark === board[1][1] && mark === board[2][2]) {
      return true
    } else if (mark === board[2][0] && mark === board[1][1] && mark === board[2][0]) {
      return true
    } else {
      return false
    }
  }
  const resetBoard = () => board = Array(3).fill('').map(() => Array(3).fill('.'));
  return { showBoard, placeMark, resetBoard };
})();
// Check if valid if is valid place mark else return error

function createPlayer(name, marker) {
  return {
    name: name,
    marker: marker,
  }
}


gameboard.placeMark("X", 0, 0);
gameboard.placeMark("X", 0, 1);
gameboard.placeMark("X", 0, 1);
gameboard.placeMark("X", 1, 1);
gameboard.placeMark("X", 2, 2);
gameboard.showBoard();
gameboard.resetBoard();
gameboard.showBoard();

let player1 = createPlayer("Pedro", "X");
let player2 = createPlayer("Jairo", "O");
console.log(player1.name);

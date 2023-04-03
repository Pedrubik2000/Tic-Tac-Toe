/* eslint-disable no-underscore-dangle */
const gameBoard = (function () {
  let _values = [0, 1, 2];
  let _board = [];
  for (let row = 0; row < 3; row += 1) {
    _board[row] = [];
    for (let column = 0; column < 3; column += 1) {
      _board[row][column] = 0;
    }
  }

  function board() {
    return _board;
  }

  function addMark(row, column, mark) {
    if (_board[row][column] === 0) {
      _board[row][column] = mark;
    }
  }

  function checkWin() {}

  function checkColumn(column, mark) {
    const checkValues = [];
    for (let row = 0; row < 3; row += 1) {
      checkValues.push(_board[row][column]);
    }
    return checkValues.every((value) => value === mark);
  }

  function checkRow(row, mark) {
    const checkValues = [];
    for (let column = 0; column < 3; column += 1) {
      checkValues.push(_board[row][column]);
    }
    return checkValues.every((value) => value === mark);
  }

  function checkLeftDiagonal(mark) {
    const checkValues = [_board[0][0], _board[1][1], _board[2][2]];
    return checkValues.every((value) => value === mark);
  }

  function checkRightDiagonal(mark) {
    const checkValues = [_board[0][2], _board[1][1], _board[2][0]];
    return checkValues.every((value) => value === mark);
  }

  return {
    board,
    addMark,
    checkColumn,
    checkRow,
    checkLeftDiagonal,
    checkRightDiagonal,
  };
})();

/* eslint-disable no-underscore-dangle */
const gameBoard = (function () {
  const _board = [];
  for (let row = 0; row < 3; row += 1) {
    _board[row] = [];
    for (let column = 0; column < 3; column += 1) {
      _board[row][column] = 0;
    }
  }

  function board() {
    return _board;
  }

  function resetBoard() {
    for (let row = 0; row < 3; row += 1) {
      _board[row] = [];
      for (let column = 0; column < 3; column += 1) {
        _board[row][column] = 0;
      }
    }
  }

  function addMark(row, column, mark) {
    if (_board[row][column] === 0) {
      _board[row][column] = mark;
      return true;
    }
    return false;
  }

  function checkWin(column, row, mark) {
    if (
      gameBoard.checkColumn(column, mark) ||
      gameBoard.checkRow(row, mark) ||
      gameBoard.checkLeftDiagonal(mark) ||
      gameBoard.checkRightDiagonal(mark)
    ) {
      return true;
    }
    return false;
  }

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

  function checkTie() {
    const checkValues = [];
    for (let row = 0; row < _board.length; row += 1) {
      for (let column = 0; column < _board.length; column += 1) {
        checkValues.push(_board[row][column])
      }
    }
    console.log(checkValues)
    return checkValues.every((value) => value !== 0);
  }

  return {
    board,
    addMark,
    checkColumn,
    checkRow,
    checkLeftDiagonal,
    checkRightDiagonal,
    checkWin,
    checkTie,
  };
})();

const playerFactory = (name, mark) => {
  return { name, mark };
};

const gameController = (function () {
  let players = [];
  let _currentTurnPlayer = 1;
  function createPlayers(name1, name2) {
    players[0] = playerFactory(name1, 1);
    players[1] = playerFactory(name2, 2);
  }
  function changeTurn() {
    if (_currentTurnPlayer === 1) {
      _currentTurnPlayer = 2;
      gameController.currentTurnPlayer();
    } else {
      _currentTurnPlayer = 1;
      gameController.currentTurnPlayer();
    }
  }
  function playTurn(row, column) {
    if (gameBoard.addMark(row, column, _currentTurnPlayer)) {
      console.log(gameBoard.board());
      if (gameBoard.checkWin(row, column, _currentTurnPlayer)) {
        console.log(
          `Win of: ${
            players[_currentTurnPlayer - 1].name
          } with ${_currentTurnPlayer}`
        );
      }else if(gameBoard.checkTie()){
        console.log("Tie")
      } else {
        gameController.changeTurn();
      }
    } else {
      console.log("Play a valid field");
    }
  }
  function currentTurnPlayer() {
    console.log(
      `Turn of: ${
        players[_currentTurnPlayer - 1].name
      } with ${_currentTurnPlayer}`
    );
  }

  return {
    createPlayers,
    changeTurn,
    players,
    currentTurnPlayer,
    playTurn,
  };
})();

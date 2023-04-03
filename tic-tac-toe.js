/* eslint-disable no-underscore-dangle */
const gameBoard = (function () {
  const _board = [];
  for (let row = 0; row < 3; row += 1) {
    _board[row] = [];
    for (let column = 0; column < 3; column += 1) {
      _board[row][column] = 0;
    }
  }

  function getBoard() {
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
    }
    console.log(
      `Added: _board[${row}][${column} ${_board[row][column]} = ${mark}`
    );
  }

  function checkWin(column, row, mark) {
    const board = gameBoard.getBoard();
    if (
      gameBoard.checkColumn(column, mark, board) ||
      gameBoard.checkRow(row, mark, board) ||
      gameBoard.checkLeftDiagonal(mark, board) ||
      gameBoard.checkRightDiagonal(mark, board)
    ) {
      return true;
    }
    return false;
  }

  function checkColumn(column, mark, board) {
    const checkValues = [board[0][column], board[1][column], board[2][column]];
    console.log(board[2][column]);
    console.log(`CheckColumn: ${checkValues}`);
    return checkValues.every((value) => value === mark);
  }
  
  function checkRow(row, mark, board) {
    const checkValues = [];
    for (let column = 0; column < 3; column += 1) {
      checkValues.push(board[row][column]);
    }
    console.log(`CheckRow: ${checkValues}`);
    return checkValues.every((value) => value === mark);
  }
  
  function checkLeftDiagonal(mark, board) {
    const checkValues = [board[0][0], board[1][1], board[2][2]];
    console.log(`CheckLeftDiagonal: ${checkValues}`);
    return checkValues.every((value) => value === mark);
  }
  
  function checkRightDiagonal(mark, board) {
    const checkValues = [board[0][2], board[1][1], board[2][0]];
    console.log(`CheckRightDiagonal: ${checkValues}`);
    return checkValues.every((value) => value === mark);
  }  

  function checkTie() {
    const checkValues = [];
    for (let row = 0; row < _board.length; row += 1) {
      for (let column = 0; column < _board.length; column += 1) {
        checkValues.push(_board[row][column]);
      }
    }
    console.log(`CheckTie: ${checkValues}`);
    return checkValues.every((value) => value !== 0);
  }

  return {
    getBoard,
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
    if (gameBoard.getBoard()[row][column] === 0) {
      console.log(`Row = ${row} Column = ${column}`);
      gameBoard.addMark(row, column, _currentTurnPlayer);
      if (gameBoard.checkWin(row, column, _currentTurnPlayer)) {
        console.log(
          `Win of: ${
            players[_currentTurnPlayer - 1].name
          } with ${_currentTurnPlayer}`
        );
      } else if (gameBoard.checkTie()) {
        console.log("Tie");
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

let shield =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>shield-outline</title><path fill="blue" d="M21,11C21,16.55 17.16,21.74 12,23C6.84,21.74 3,16.55 3,11V5L12,1L21,5V11M12,21C15.75,20 19,15.54 19,11.22V6.3L12,3.18L5,6.3V11.22C5,15.54 8.25,20 12,21Z" /></svg>';
let sword =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>sword-cross</title><path fill="red" d="M6.2,2.44L18.1,14.34L20.22,12.22L21.63,13.63L19.16,16.1L22.34,19.28C22.73,19.67 22.73,20.3 22.34,20.69L21.63,21.4C21.24,21.79 20.61,21.79 20.22,21.4L17,18.23L14.56,20.7L13.15,19.29L15.27,17.17L3.37,5.27V2.44H6.2M15.89,10L20.63,5.26V2.44H17.8L13.06,7.18L15.89,10M10.94,15L8.11,12.13L5.9,14.34L3.78,12.22L2.37,13.63L4.84,16.1L1.66,19.29C1.27,19.68 1.27,20.31 1.66,20.7L2.37,21.41C2.76,21.8 3.39,21.8 3.78,21.41L7,18.23L9.44,20.7L10.85,19.29L8.73,17.17L10.94,15Z" /></svg>';

const displayController = (function () {
  function createDiv() {
    let game = document.querySelector(".game");
    for (let i = 0; i < 3; i += 1) {
      for (let y = 0; y < 3; y += 1) {
        let field = document.createElement("a");
        console.log(i);
        field.setAttribute("row", i);
        field.setAttribute("column", y);
        game.appendChild(field);
      }
    }
  }
  function refreshBoard() {
    const displayBoard = document.querySelector(".game");
    displayBoard.innerHTML = "";
    for (let row = 0; row < gameBoard.getBoard().length; row += 1) {
      for (let column = 0; column < gameBoard.getBoard().length; column += 1) {
        const newField = document.createElement("a");
        newField.setAttribute("row", row);
        if (gameBoard.getBoard()[row][column] === 1) {
          newField.innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>sword-cross</title><path fill="red" d="M6.2,2.44L18.1,14.34L20.22,12.22L21.63,13.63L19.16,16.1L22.34,19.28C22.73,19.67 22.73,20.3 22.34,20.69L21.63,21.4C21.24,21.79 20.61,21.79 20.22,21.4L17,18.23L14.56,20.7L13.15,19.29L15.27,17.17L3.37,5.27V2.44H6.2M15.89,10L20.63,5.26V2.44H17.8L13.06,7.18L15.89,10M10.94,15L8.11,12.13L5.9,14.34L3.78,12.22L2.37,13.63L4.84,16.1L1.66,19.29C1.27,19.68 1.27,20.31 1.66,20.7L2.37,21.41C2.76,21.8 3.39,21.8 3.78,21.41L7,18.23L9.44,20.7L10.85,19.29L8.73,17.17L10.94,15Z" /></svg>';
        } else if (gameBoard.getBoard()[row][column] === 2) {
          newField.innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>shield-outline</title><path fill="blue" d="M21,11C21,16.55 17.16,21.74 12,23C6.84,21.74 3,16.55 3,11V5L12,1L21,5V11M12,21C15.75,20 19,15.54 19,11.22V6.3L12,3.18L5,6.3V11.22C5,15.54 8.25,20 12,21Z" /></svg>';
        }
        newField.setAttribute("column", column);
        displayBoard.appendChild(newField);
      }
    }
    displayController.addEvent();
  }
  function addEvent() {
    document.querySelectorAll("a[row][column]").forEach((a) => {
      const row = a.getAttribute("row");
      const column = a.getAttribute("column");
      a.addEventListener("click", () => {
        gameController.playTurn(row, column);
        displayController.refreshBoard();
        console.log(row, column);
      });
    });
  }
  function buttonStart() {
    document.querySelector("#start").addEventListener("click", () => {
      let player1 = document.querySelector(
        "div:nth-child(1) > input[type=text]"
      ).value;
      console.log(player1);
      let player2 = document.querySelector(
        "div:nth-child(2) > input[type=text]"
      ).value;
      gameController.createPlayers(player1, player2);
      addEvent();
    });
  }
  return {
    createDiv,
    addEvent,
    buttonStart,
    refreshBoard,
  };
})();

displayController.createDiv();
displayController.buttonStart();

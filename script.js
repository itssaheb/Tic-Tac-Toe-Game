let gameStatus = document.querySelector(".game-info");
let boxes = document.querySelectorAll(".box");
let newGame = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Default initializaton
initialize();
function initialize() {
  currentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];

  boxes.forEach((box, index) => {
    box.innerHTML = "";
    boxes[index].style.pointerEvents = "all";
    box.classList.remove("win");
  });
  newGame.classList.remove("active");
  gameStatus.innerHTML = `Current Player - ${currentPlayer}`;
}
// swap player
function swapPlayer() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
  // update in UI
  gameStatus.innerHTML = `Current Player - ${currentPlayer}`;
}

function checkwinner() {
  let answer = "";
  winningPositions.forEach((position) => {
    if (
      (gameGrid[position[0]] !== "" ||
        gameGrid[position[1]] !== "" ||
        gameGrid[position[2]] !== "") &&
      gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[1]] === gameGrid[position[2]]
    ) {
      // take winner identity
      if (gameGrid[position[0]] === "X") {
        answer = "X";
      } else {
        answer = "O";
      }
      //  Disable Pointer Event
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });

      // paint winner grid
      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");
    }
  });

  // who is winner
  if (answer !== "") {
    gameStatus.innerHTML = `Winner Player - ${answer}`;
    newGame.classList.add("active");
    return;
  }

  let gridCount = 0;
  gameGrid.forEach((box) => {
    if (box !== "") {
      gridCount++;
    }
  });

  if (gridCount === 9) {
    gameStatus.innerHTML = `Game is tied !`;
    newGame.classList.add("active");
  }
}

// handle each box
function handleClick(index) {
  if (gameGrid[index] === "") {
    boxes[index].innerHTML = currentPlayer;
    gameGrid[index] = currentPlayer;
    boxes[index].style.pointerEvents = "none";
    swapPlayer();
    checkwinner();
  }
}
// addeventlistener function on boxes
boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

// new game button
newGame.addEventListener("click", () => {
  initialize();
});

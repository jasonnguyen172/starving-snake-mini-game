
import {Snake} from "./snake.js";

const moveSpeed = 200;

const KeyInput = ['d', 'w', 'a', 's'];

const Apple = document.createElement("img");
Apple.src = "./img/Apple2.png";
Apple.id = 'theApple';


main();


function main() {
  document.addEventListener("DOMContentLoaded", function () {
    // get the grid
    const grid = document.getElementsByTagName("tr");
  
    // init the snake
    let snake = new Snake();
    snake.displaySnake(grid);

    // init score
    document.getElementById("score").innerHTML =
      "Your Score: " + snake.score.toString();
  
    // random apple position
    let applePos = setRandomPos(snake);
    let apple = createObj(grid, applePos, Apple);
  
    // // init auto moving
    let startButton = document.getElementById("startButton");
    let resetButton = document.getElementById("resetButton");

    startButton.addEventListener("click", function () {
      startButton.disabled = true;
      let autoMove = setInterval(() => {
        if (!snake.moveAStep(grid)) {
          finishGame(autoMove, resetButton, snake)
        }
        applePos = checkGetApple(grid, snake, applePos);
      }, moveSpeed);
    });

    // add keys eventlistener
    document.onkeypress = function (e) {
      let opposite = getOpposite(snake.snakeDirection);
      if (opposite !== e.key && KeyInput.includes(e.key)) {
        snake.snakeDirection = e.key;
      }
    };
  });
}

function finishGame(autoMove, resetButton, snake) {
  console.log('the game finished');
  document.getElementById('thanks').innerHTML = 'Thank You for visiting my page !'
  document.getElementById('content').innerHTML = 'You got ' + snake.score.toString() + ' points'
  document.getElementById('gameover').innerHTML ='Game Over';
  clearInterval(autoMove);
  resetButton.style = "display: block";
  resetButton.addEventListener("click", function () {
    location.reload();
  });
}

function checkGetApple(grid, snake, applePos) {
  if (compareTwoList(applePos, snake.head.coord)) {
    snake.addApart = true;
    snake.score++;
    updateScore(snake);
    applePos = setRandomPos(snake);
    createObj(grid, applePos, Apple);
  }
  return applePos;
}

function updateScore(snake) {
  document.getElementById("score").innerHTML =
    "Your Score: " + snake.score.toString();
}

function createObj(grid, position, obj) {
  grid[position[0]].children[position[1]].appendChild(obj);
  return obj;
}

function setRandomPos(snake) {
  let objPos = getRandomPos();
  while (JSON.stringify(snake.getCoords()).includes(JSON.stringify(objPos))) {
    objPos = getRandomPos();
  }
  return objPos;
}

function getRandomPos() {
  let row = Math.floor(Math.random() * 10);
  let col = Math.floor(Math.random() * 10);
  return [row, col];
}

function compareTwoList(a, b) {
  if (a.length != b.length) {
    return false;
  } else {
    for (var i = 0; i < a.length; i++) {
      if (a[i] != b[i]) {
        return false;
      }
    }
    return true;
  }
}

function getOpposite(direction) {
  let opposite = "";
  switch (direction) {
    case "w":
      opposite = "s";
      break;
    case "s":
      opposite = "w";
      break;
    case "d":
      opposite = "a";
      break;
    case "a":
      opposite = "d";
      break;
    case "ArrowUp":
      opposite = "ArrowDown";
      break;
    case "ArrowDown":
      opposite = "ArrowUp";
      break;
    case "ArrowLeft":
      opposite = "ArrowRight";
      break;
    case "ArrowRight":
      opposite = "ArrowLeft";
      break;
  }
  return opposite;
}

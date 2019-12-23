const HeadIMG = {
  d: "./img/theHeadRight.png",
  w: "./img/theHeadUp.png",
  a: "./img/theHeadLeft.png",
  s: "./img/theHeadDown.png"
};

const BodyIMG = {
  d: "./img/theBody.png",
  w: "./img/theBodyUp.png",
  a: "./img/theBody.png",
  s: "./img/theBodyDown.png"
};

const TailIMG = {
  d: "./img/theTailRight.png",
  w: "./img/theTailUp.png",
  a: "./img/theTailLeft.png",
  s: "./img/theTailDown.png"
};

export class Apart {
  constructor(_element, _src, _direction, _coord) {
    this.coord = _coord;
    this.src = _src;
    this.element = document.createElement(_element);
    this.element.className = 'snakeSize abc';
    this.direction = _direction;
    this.element.src = this.src[this.direction];
  }
  changeIMG = function() {
    this.element.src = this.src[this.direction];
  };
}

export class Snake {
  constructor(_speed) {
    this.speed = _speed;
    this.head = new Apart("img", HeadIMG, "d", [5, 5]);
    this.tail = new Apart("img", TailIMG, "d", [5, 2]);
    this.body = [];
    for (let i = 3; i < 5; i++) {
      this.body.push(new Apart("img", BodyIMG, "d", [5, i]));
    }
  }

  snakeDirection = "d";
  addApart = false;
  score = 0;

  getCoords = function() {
    let res = [this.head.coord];
    for (let item of this.body) {
      res.unshift(item.coord);
    }
    res.push(this.tail.coord);
    return res.sort();
  };

  displaySnake = function(grid) {
    // show head
    grid[this.head.coord[0]].children[this.head.coord[1]].appendChild(
      this.head.element
    );
    // show body
    for (let i = 0; i < this.body.length; i++) {
      grid[this.body[i].coord[0]].children[this.body[i].coord[1]].appendChild(
        this.body[i].element
      );
    }
    // show tail
    grid[this.tail.coord[0]].children[this.tail.coord[1]].appendChild(
      this.tail.element
    );
  };

  checkBiteYourself = function() {
    let res = [];
    for (let item of this.body) {
      res.unshift(item.coord);
    }
    res.push(this.tail.coord);
    return JSON.stringify(res).includes(
      JSON.stringify(this.head.coord)
    );
  }

  checkValidMove = function(grid) {
    let limitArea = grid.length - 1;
    if (
      (this.head.coord[0] > limitArea) |
      (this.head.coord[0] < 0) |
      (this.head.coord[1] > limitArea) |
      (this.head.coord[0] < 0)
    ) {
      return false;
    }
    if (this.checkBiteYourself()) {
      return false;
    }
    return true;
  };

  moveHead = function(grid) {
    switch (this.snakeDirection) {
      case "w":
        this.head.coord[0] -= 1;
        break;
      case "s":
        this.head.coord[0] += 1;
        break;
      case "a":
        this.head.coord[1] -= 1;
        break;
      case "d":
        this.head.coord[1] += 1;
        break;
      case "ArrowUp":
        this.head.coord[0] -= 1;
        break;
      case "ArrowDown":
        this.head.coord[0] += 1;
        break;
      case "ArrowLeft":
        this.head.coord[1] -= 1;
        break;
      case "ArrowRight":
        this.head.coord[1] += 1;
        break;
    }
    this.head.direction = this.snakeDirection;
    this.head.changeIMG();
  };

  moveBody = function(oldHeadCoord) {
    for (let i = 0; i < this.body.length - 1; i++) {
      this.body[i].coord = this.body[i + 1].coord;
      this.body[i].direction = this.body[i + 1].direction;
      this.body[i].changeIMG();
    }
    this.body[this.body.length - 1].coord = [...oldHeadCoord];
    if (this.body[this.body.length - 1].direction !== this.head.direction) {
      this.body[this.body.length - 1].direction = this.head.direction;
      this.body[this.body.length - 1].changeIMG();
    }
  };

  moveTail = function(oldLastBody) {
    this.tail.coord = [...oldLastBody.coord];
    this.tail.direction = oldLastBody.direction;
    this.tail.changeIMG();
  };

  moveAStep = function(grid) {
    let oldHeadCoord = [...this.head.coord];
    let oldLastBody = Object.assign({}, this.body[0]);
    this.moveHead();
    
    if(!this.checkValidMove(grid)) {
      return false
    }

    if (this.addApart) {
      this.body.push(
        new Apart("img", BodyIMG, this.head.direction, oldHeadCoord)
      );
      this.addApart = false;
    } else {
      this.moveBody(oldHeadCoord);
      this.moveTail(oldLastBody);
    }
    this.displaySnake(grid);
    return true
  };
}

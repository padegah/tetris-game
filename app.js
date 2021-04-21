document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector(".grid");
    let squares = Array.from(document.querySelectorAll(".grid div"));
    const scoreDisplay = document.querySelector("#score");
    const startBtn = document.querySelector("#start-button");
    const width = 10;
    let nextRandom = 0;
    let timerId;
    let score = 0;

// the tetrominoes

    const lTetromino = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
    ]

    const zTetromino = [
        [0, width, width+1, width*2+1],
        [width+1, width+2, width*2, width*2+1],
        [0, width, width+1, width*2+1],
        [width+1, width+2, width*2, width*2+1]
    ]

    const tTetromino = [
        [1, width, width+1, width+2],
        [1, width+1, width+2, width*2+1],
        [width, width+1, width+2, width*2+1],
        [1, width, width+1, width*2+1]
    ]

    const oTetromino = [
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1]
    ]

    const iTetromino = [
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3],
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3]
    ]


    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];

    let currentPosition = 4;
    let currentRotation = 0;
    // let current = theTetrominoes[0][0];

    let random = Math.floor(Math.random()*theTetrominoes.length);
    let current = theTetrominoes[random][currentRotation];

    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add("tetromino");
        })
    }

    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove("tetromino");
        })
    }

    timerId = setInterval(moveDown, 500);

    // function control(e) {
    //     if(e.keyCode === 37) {
    //         moveLeft();
    //     } else if(e.keycode === 39) {
    //         moveRight();
    //     } else if(e.keycode === 38) {
    //         rotate();
    //     } else if(e.keycode === 40) {
    //         moveDown();
    //     }
    // }

    // document.addEventListener("keyup", control);

    function moveDown() {
        undraw();
        currentPosition += width;
        draw();
        freeze();
    }

    function freeze() {
        if(current.some(index => squares[currentPosition + index + width].classList.contains("taken"))) {
            current.forEach(index => squares[currentPosition + index].classList.add("taken"));

            // random = nextRandom;
            random = Math.floor(Math.random() * theTetrominoes.length);
            current = theTetrominoes[random][currentRotation];
            currentPosition = 4;
            draw();
            // displayShape();
            // addScore();
            // gameOver();
        }
    }

    function moveLeft(){
        // console.log("moving left");
        undraw();
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0);

        if(!isAtLeftEdge) {
            currentPosition -= 1;
        }

        if(current.some(index => squares[currentPosition + index].classList.contains("taken"))) {
            currentPosition += 1;
        }

        draw();
    }

    function moveRight() {
        undraw();
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width-1);

        if(!isAtRightEdge){
            currentPosition += 1;
        }

        if(current.some(index => squares[currentPosition + index].classList.contains("taken"))) {
            currentPosition -= 1;
        }

        draw();
    }

    function rotate() {
        undraw();
        currentRotation++;
        if(currentRotation === current.length) {
            currentRotation = 0;
        }

        current = theTetrominoes[random][currentRotation];

        draw();
    }


    document.onkeydown = function (e) {
        switch (e.key) {
            case 'ArrowUp':
                rotate();
                break;
            case 'ArrowDown':
                moveDown();
                break;
            case 'ArrowLeft':
                moveLeft();
                break;
            case 'ArrowRight':
                moveRight();
        }
    };
});

let turn = 'x';
let squars = [];
let moves = 0;
let gameOver = false;
let header = document.getElementsByTagName("header")[0];
let allSquares = document.querySelectorAll(".squar");


allSquares.forEach((squar, index) => {
    squar.addEventListener("click", () => {
        if (!squar.textContent && !gameOver) {
            squar.textContent = turn;
            squars[index] = turn;
            moves++;
            turn = turn == 'x' ? 'o' : 'x';
            header.textContent = turn.toUpperCase();
        } else {
            return;
        }
        checkWinner();
        if (moves == 9 && !gameOver) {
            drow()
        }
    });



});

function checkWinner() {
    const wineCondition = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let cambo of wineCondition) {
        const [num1, num2, num3] = cambo;
        if (squars[num1] == squars[num2] && squars[num2] == squars[num3] && squars[num1]) {
            win(num1, num2, num3);
        }
    }

}

function win(num1, num2, num3) {

    [num1, num2, num3].forEach(num => {
        document.getElementById("squar" + num).style.background = 'var(--yellow)';
    })
    header.textContent = `${squars[num1].toUpperCase()} win`;
    setInterval(() => {
        header.textContent += '.'
    }, 1000)
    setTimeout(() => {
        location.reload();
    }, 3500);
    gameOver = true;

}
function drow() {
    const newLocal = header.textContent = 'Drow';
    setTimeout(() => {
        location.reload();
    }, 3500);
    setInterval(() => {
        header.textContent += '.'
    }, 1000)
}

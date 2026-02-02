let turn = 'x';
let squars = [];
let gameOver = false;
let evenCount = 1;

let header = document.getElementsByTagName("header")[0]
function fillSquars(id) {
    if (gameOver || evenCount > 9) {
        return;
    }
    let squar = document.getElementById(id)
    if (turn == 'x' && !squar.textContent) {
        squar.textContent = 'x';
        header.textContent = 'O'
        turn = 'o'
    } else if (turn == 'o' && !squar.textContent) {
        squar.textContent = 'o';
        header.textContent = 'X'
        turn = 'x'
    }
    evenCount += 1;
    isWinner()
}

function wine(num1, num2, num3) {
    document.getElementById('squar' + num1).style.background = 'var(--yellow)';
    document.getElementById('squar' + num2).style.background = 'var(--yellow)';
    document.getElementById('squar' + num3).style.background = 'var(--yellow)';
    header.textContent = squars[1].toUpperCase() + ' wine';
    setInterval(() => {
        header.textContent += '.'
    }, 1000)
    setTimeout(() => {
        location.reload()
    }, 3500)
    gameOver = true;
}
function even() {
    header.textContent = 'even';
    setInterval(() => {
        header.textContent += '.'
    }, 1000)
    setTimeout(() => {
        location.reload()
    }, 3500)
    gameOver = true;
}


function isWinner() {
    for (let i = 1; i < 10; i++) {
        squars[i] = document.getElementById('squar' + i).textContent;
    }
    if (squars[1] == squars[2] && squars[2] == squars[3] && squars[1] != "") {
        wine(1, 2, 3)
    }
    if (squars[4] == squars[5] && squars[5] == squars[6] && squars[4] != "") {
        wine(4, 5, 6)
    }
    if (squars[7] == squars[8] && squars[8] == squars[9] && squars[9] != "") {
        wine(7, 9, 8)
    }
    if (squars[1] == squars[4] && squars[1] == squars[7] && squars[7] != "") {
        wine(1, 7, 4)
    }
    if (squars[2] == squars[5] && squars[8] == squars[2] && squars[8] != "") {
        wine(2, 5, 8)
    }
    if (squars[9] == squars[3] && squars[3] == squars[6] && squars[6] != "") {
        wine(9, 3, 6)
    }
    if (squars[1] == squars[5] && squars[5] == squars[9] && squars[9] != "") {
        wine(1, 5, 9)
    }
    if (squars[5] == squars[7] && squars[7] == squars[3] && squars[3] != "") {
        wine(5, 7, 3)
    }
    if (evenCount > 9 && !gameOver) {
        even()
    }
}

const playerX = document.getElementById("playerX-play");
const playerO = document.getElementById("playerO-play");

const cells = document.querySelectorAll(".grid-cell");

const resetBtn = document.getElementById("reset-btn");

const showDialogBtn = document.getElementById("show-dialog-btn");

const winnerDialog = document.getElementById("winner-dialog");
const tieDialog = document.getElementById("tie-dialog");

const winnerPlayer = document.getElementById("winner-player");

const closeWinningDialog = document.getElementById("close-winning-dialog");
const closeTieDialog = document.getElementById("close-tie-dialog");

// GAME LOGIC
const gameboard = (function () {
    const winningCombos = [
        ["1", "2", "3"],
        ["4", "5", "6"],
        ["7", "8", "9"],
        ["1", "4", "7"],
        ["2", "5", "8"],
        ["3", "6", "9"],
        ["1", "5", "9"],
        ["3", "5", "7"],
    ];

    let playerXList = [];
    let playerOList = [];
    let index = 0;

    const addToList = (num) => {
        getPlayerList().push(num);
    };

    const changePlayer = () => {
        index++;
    };

    const logLists = () => {
        console.log("X: ", playerXList);
        console.log("O: ", playerOList);
    };

    const getPlayerList = () => {
        return index % 2 === 0 ? playerXList : playerOList;
    };

    const getPlayerName = () => {
        return index % 2 === 0 ? "Player X" : "Player O";
    };

    const getIndex = () => {
        return index;
    };

    const checkWinning = () => {
        for (const winning of winningCombos) {
            if (winning.every((num) => getPlayerList().includes(num))) {
                return true;
            }
        }

        return false;
    };

    const checkTie = () => {
        return index === 8;
    };

    const resetGame = () => {
        playerOList = [];
        playerXList = [];
        index = 0;
    };

    return {
        checkWinning,
        checkTie,
        addToList,
        changePlayer,
        getIndex,
        logLists,
        getPlayerName,
        resetGame,
    };
})();

// EVENT LISTENERS
cells.forEach((cell) => {
    cell.addEventListener("click", (e) => {
        gameboard.addToList(e.target.dataset.cell);
        // disable cell btn
        e.target.disabled = true;

        // fill the board cell with 'X' or 'O'
        e.target.innerHTML = gameboard.getIndex() % 2 === 0 ? "X" : "O";

        // check if tie/winning or keep playing
        const winning = gameboard.checkWinning();
        const tie = gameboard.checkTie();
        if (tie || winning) {
            if (winning) {
                winnerPlayer.innerText += gameboard.getPlayerName();
                winnerDialog.showModal();
            } else {
                tieDialog.showModal();
            }
            resetBtn.click();
        } else {
            gameboard.changePlayer();
            if (gameboard.getIndex() % 2 === 0) {
                playerO.style.display = "none";
                playerX.style.display = "block";
            } else {
                playerX.style.display = "none";
                playerO.style.display = "block";
            }
        }
    });
});

resetBtn.addEventListener("click", () => {
    gameboard.resetGame();

    cells.forEach((cell) => {
        for (const child of cell.children) {
            child.disabled = false;
            child.innerHTML = "";
        }
    });
});

closeWinningDialog.addEventListener("click", () => {
    winnerDialog.close();
});

closeTieDialog.addEventListener("click", () => {
    tieDialog.close();
});

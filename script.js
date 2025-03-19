document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const statusText = document.getElementById("status");
    const resetButton = document.getElementById("reset");
    const winnerScreen = document.getElementById("winnerScreen");
    const winnerMessage = document.getElementById("winnerMessage");
    const newGameButton = document.getElementById("newGame");

    let currentPlayer = "X";
    let board = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;

    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6] 
    ];

    function checkWinner() {
        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                gameActive = false;
                showWinnerScreen(`Player ${currentPlayer} Wins!`);
                return;
            }
        }
        if (!board.includes("")) {
            gameActive = false;
            showWinnerScreen("It's a Draw!");
        }
    }

    function handleCellClick(event) {
        const index = event.target.dataset.index;

        if (board[index] || !gameActive) return;

        board[index] = currentPlayer;
        event.target.textContent = currentPlayer;

        checkWinner();
        if (gameActive) {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            statusText.textContent = `Player ${currentPlayer}'s Turn`;
        }
    }

    function showWinnerScreen(message) {
        winnerMessage.textContent = message;
        winnerScreen.style.display = "flex";
    }

    function resetGame() {
        board.fill("");
        gameActive = true;
        currentPlayer = "X";
        statusText.textContent = "Player X's Turn";
        cells.forEach(cell => {
            cell.textContent = "";
        });
        winnerScreen.style.display = "none";
    }

    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
    resetButton.addEventListener("click", resetGame);
    newGameButton.addEventListener("click", resetGame);
});

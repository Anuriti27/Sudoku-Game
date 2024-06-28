const boardElement = document.getElementById('sudoku-board');

function generateNewSudoku() {
    boardElement.innerHTML = '';
    let board = generateSudoku();
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement('input');
            cell.type = 'number';
            cell.min = '1';
            cell.max = '9';
            cell.value = board[i][j] === 0 ? '' : board[i][j];
            cell.disabled = board[i][j] !== 0;
            boardElement.appendChild(cell);
        }
    }
}

function checkSudoku() {
    const cells = boardElement.querySelectorAll('input');
    let board = Array.from({ length: 9 }, () => Array(9).fill(0));

    cells.forEach((cell, index) => {
        const row = Math.floor(index / 9);
        const col = index % 9;
        board[row][col] = cell.value ? parseInt(cell.value, 10) : 0;
    });

    if (isSudokuValid(board)) {
        alert('Sudoku is correct!');
    } else {
        alert('Sudoku is incorrect.');
    }
}

function generateSudoku() {
    let board = Array.from({ length: 9 }, () => Array(9).fill(0));
    solveSudoku(board);
    removeDigits(board, 40); // Remove 40 digits for a medium-level puzzle
    return board;
}

function solveSudoku(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isValid(board, row, col, num)) {
                        board[row][col] = num;
                        if (solveSudoku(board)) {
                            return true;
                        }
                        board[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function isValid(board, row, col, num) {
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === num || board[i][col] === num || 
            board[Math.floor(row / 3) * 3 + Math.floor(i / 3)][Math.floor(col / 3) * 3 + i % 3] === num) {
            return false;
        }
    }
    return true;
}

function removeDigits(board, count) {
    while (count > 0) {
        let row = Math.floor(Math.random() * 9);
        let col = Math.floor(Math.random() * 9);
        if (board[row][col] !== 0) {
            board[row][col] = 0;
            count--;
        }
    }
}

function isSudokuValid(board) {
    for (let i = 0; i < 9; i++) {
        let row = new Set();
        let col = new Set();
        let box = new Set();
        for (let j = 0; j < 9; j++) {
            let rowCell = board[i][j];
            let colCell = board[j][i];
            let boxCell = board[Math.floor(i / 3) * 3 + Math.floor(j / 3)][(i % 3) * 3 + j % 3];
            if (rowCell !== 0) {
                if (row.has(rowCell)) return false;
                row.add(rowCell);
            }
            if (colCell !== 0) {
                if (col.has(colCell)) return false;
                col.add(colCell);
            }
            if (boxCell !== 0) {
                if (box.has(boxCell)) return false;
                box.add(boxCell);
            }
        }
    }
    return true;
}

generateNewSudoku();




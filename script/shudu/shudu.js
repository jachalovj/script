function checkValidNum(ni, nj, value, board) {
    let i9 = Math.floor(ni / 3);
    let j9 = Math.floor(nj / 3);

    for(let i = 0; i < 9; i++) {
        if(board[ni][i] === value || board[i][nj] === value) {
            return false;
        }

        let ci = i9 * 3 + Math.floor(i / 3);
        let cj = j9 * 3 + i % 3;
        if(board[ci][cj] === value) {
            return false;
        }
    }

    return true;
}

function getSudoku(board, num = 0) {
    // 判断结束
    if(num === 81) {
        return true;
    }

    let i = Math.floor(num / 9);
    let j = num % 9;
    if(board[i][j] !== '.') {
        return getSudoku(board, num + 1);
    }

    for(let k = 1; k <= 9; k++) {
        if(!checkValidNum(i, j, k, board, num)) {
            continue;
        }

        board[i][j] = k;
        let result = getSudoku(board, num + 1);
        if (result) {
            return true;
        }
    }
    board[i][j] = '.';

    return false;
}

/**
 *
 * @param board char字符型二维数组
 * @return void
 */
function solveSudoku(board) {
    // 递归
    getSudoku(board);
    return board;
}
module.exports = {
    solveSudoku: solveSudoku,
};


let board = [
    ['.','.',9,7,4,8,'.','.','.'],
    [7, '.','.','.','.','.','.','.','.'],
    ['.',2,'.',1,'.',9,'.','.','.'],
    ['.','.',7,'.','.','.',2,4,'.'],
    ['.',6,4,'.',1,'.',5,9,'.'],
    ['.',9,8,'.','.','.',3,'.','.'],
    ['.','.','.',8,'.',3,'.',2,'.'],
    ['.','.','.','.','.','.','.','.',6],
    ['.','.','.',2,7,5,9,'.','.'],
];
let res = solveSudoku(board);
console.log(res.map((i) => i.toString()).join('\n'));
/**
[
    [5,1,9,7,4,8,6,3,2],
    [7,8,3,6,5,2,4,1,9],
    [4,2,6,1,3,9,8,7,5],
    [3,5,7,9,8,6,2,4,1],
    [2,6,4,3,1,7,5,9,8],
    [1,9,8,5,2,4,3,6,7],
    [9,7,5,8,6,3,1,2,4],
    [8,3,2,4,9,1,7,5,6],
    [6,4,1,2,7,5,9,8,3]
];
*/

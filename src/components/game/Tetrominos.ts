const tetrominoI = [
    ['.', '.', '.', '.'],
    ['.', '.', '.', '.'],
    ['I', 'I', 'I', 'I'],
    ['.', '.', '.', '.']
]

const tetrominoO = [
    ['O', 'O'],
    ['O', 'O']
]

const tetrominoL= [
    ['.', '.', 'L'],
    ['L', 'L', 'L'],
    ['.', '.', '.']
]

const tetrominoJ = [
    ['J', '.', '.'],
    ['J', 'J', 'J'],
    ['.', '.', '.']
]

const tetrominoS= [
    ['.', 'S', 'S'],
    ['S', 'S', '.'],
    ['.', '.', '.']
]

const tetrominoZ= [
    ['Z', 'Z', '.'],
    ['.', 'Z', 'Z'],
    ['.', '.', '.']
]

const tetrominoT= [
    ['.', 'T', '.'],
    ['T', 'T', 'T'],
    ['.', '.', '.']
]

const shapes = [tetrominoI, tetrominoJ, tetrominoL, tetrominoO, tetrominoS, tetrominoT, tetrominoZ]

function getRandomTetromino(){
    const rng : number = Math.floor(Math.random() * 7)
    return shapes[rng]
}

export {
    getRandomTetromino,
    tetrominoT,
    tetrominoZ,
    tetrominoI,
    tetrominoJ,
    tetrominoL,
    tetrominoO,
    tetrominoS
}
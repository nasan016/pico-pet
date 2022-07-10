<script setup lang="ts">
import { ref } from 'vue'
import { onMounted } from 'vue'
import NextDisplay from './stat-display/NextDisplay.vue'
import StatDisplay from './stat-display/StatDisplay.vue'
import {board, getTetrominoColor, isString} from "@/components/game/game";
import { 
    getRandomTetromino, 
    tetrominoI, 
    tetrominoO, 
    tetrominoT, 
    tetrominoZ, 
    tetrominoS, 
    tetrominoL, 
    tetrominoJ } from './Tetrominos'

const playerPiece1XY = ref([0, 0])
const playerPiece2XY = ref([0, 0])
const playerPiece3XY = ref([0, 0])
const playerPiece4XY = ref([0, 0])

const placedPieces = ref([[-1, -1]])
const drawBlock = ref([' '])
const time = ref(80)


const gravity = () => {
    (board.value)[(playerPiece1XY.value)[0]][(playerPiece1XY.value)[1]] = '.';
    (board.value)[(playerPiece2XY.value)[0]][(playerPiece2XY.value)[1]] = '.';
    (board.value)[(playerPiece3XY.value)[0]][(playerPiece3XY.value)[1]] = '.';
    (board.value)[(playerPiece4XY.value)[0]][(playerPiece4XY.value)[1]] = '.';

    ((playerPiece1XY.value)[0]) = ((playerPiece1XY.value)[0]) + 1;
    ((playerPiece2XY.value)[0]) = ((playerPiece2XY.value)[0]) + 1;
    ((playerPiece3XY.value)[0]) = ((playerPiece3XY.value)[0]) + 1;
    ((playerPiece4XY.value)[0]) = ((playerPiece4XY.value)[0]) + 1;

    (board.value)[(playerPiece1XY.value)[0]][(playerPiece1XY.value)[1]] = drawBlock.value;
    (board.value)[(playerPiece2XY.value)[0]][(playerPiece2XY.value)[1]] = drawBlock.value;
    (board.value)[(playerPiece3XY.value)[0]][(playerPiece3XY.value)[1]] = drawBlock.value;
    (board.value)[(playerPiece4XY.value)[0]][(playerPiece4XY.value)[1]] = drawBlock.value;

        if(collisionDetection() === false){
            clearInterval(playerGravity)
            playerGravity = setInterval(gravity, time.value)
            pieceInit()
            console.log((board.value)[(playerPiece1XY.value)[0]][(playerPiece1XY.value)[1]])
        }

}

let playerGravity = setInterval(gravity, time.value)

const collisionDetection = () => {
    
    if (
    (playerPiece1XY.value)[0] > 22
    || (playerPiece2XY.value)[0] > 22
    || (playerPiece3XY.value)[0] > 22
    || (playerPiece4XY.value)[0] > 22){
        (board.value)[(playerPiece1XY.value)[0]][(playerPiece1XY.value)[1]] = drawBlock.value.toString();
        (board.value)[(playerPiece2XY.value)[0]][(playerPiece2XY.value)[1]] = drawBlock.value.toString();
        (board.value)[(playerPiece3XY.value)[0]][(playerPiece3XY.value)[1]] = drawBlock.value.toString();
        (board.value)[(playerPiece4XY.value)[0]][(playerPiece4XY.value)[1]] = drawBlock.value.toString();
        return false
    }
    else if(
        ((board.value)[(playerPiece1XY.value)[0] + 1][(playerPiece1XY.value)[1]] !== '.' 
            && isString((board.value)[(playerPiece1XY.value)[0] + 1][(playerPiece4XY.value)[1]]))
        || ((board.value)[(playerPiece2XY.value)[0] + 1][(playerPiece2XY.value)[1]] !== '.' 
            && isString((board.value)[(playerPiece2XY.value)[0] + 1][(playerPiece4XY.value)[1]]))
        || ((board.value)[(playerPiece3XY.value)[0] + 1][(playerPiece3XY.value)[1]] !== '.' 
            && isString((board.value)[(playerPiece3XY.value)[0] + 1][(playerPiece4XY.value)[1]]))
        || (((board.value)[(playerPiece4XY.value)[0] + 1][(playerPiece4XY.value)[1]] !== '.')
            && isString((board.value)[(playerPiece4XY.value)[0] + 1][(playerPiece4XY.value)[1]])))
    {
        (board.value)[(playerPiece1XY.value)[0]][(playerPiece1XY.value)[1]] = drawBlock.value.toString();
        (board.value)[(playerPiece2XY.value)[0]][(playerPiece2XY.value)[1]] = drawBlock.value.toString();
        (board.value)[(playerPiece3XY.value)[0]][(playerPiece3XY.value)[1]] = drawBlock.value.toString();
        (board.value)[(playerPiece4XY.value)[0]][(playerPiece4XY.value)[1]] = drawBlock.value.toString();
        return false
    }
    else {
        return true
    }

}

const pieceInit = () => {
    const currPiece = getRandomTetromino()
    switch(currPiece){
        case tetrominoI:
            playerPiece1XY.value = [2, 3]
            playerPiece2XY.value = [2, 4]
            playerPiece3XY.value = [2, 5]
            playerPiece4XY.value = [2, 6]
            drawBlock.value = ['I']
            break
        case tetrominoO:
            playerPiece1XY.value = [0, 4]
            playerPiece2XY.value = [0, 5]
            playerPiece3XY.value = [1, 4]
            playerPiece4XY.value = [1, 5]
            drawBlock.value = ['O']
            break
        case tetrominoJ:
            playerPiece1XY.value = [0, 4]
            playerPiece2XY.value = [1, 4]
            playerPiece3XY.value = [1, 5]
            playerPiece4XY.value = [1, 6]
            drawBlock.value = ['J']
            break
        case tetrominoL:
            playerPiece1XY.value = [1, 4]
            playerPiece2XY.value = [1, 5]
            playerPiece3XY.value = [1, 6]
            playerPiece4XY.value = [0, 6]
            drawBlock.value = ['L']
            break
        case tetrominoS:
            drawBlock.value = ['S']
            playerPiece1XY.value = [1, 4]
            playerPiece2XY.value = [1, 5]
            playerPiece3XY.value = [0, 5]
            playerPiece4XY.value = [0, 6]
            break
        case tetrominoZ:
            playerPiece1XY.value = [0, 4]
            playerPiece2XY.value = [0, 5]
            playerPiece3XY.value = [1, 5]
            playerPiece4XY.value = [1, 6]
            drawBlock.value = ['Z']
            break
        case tetrominoT:
            playerPiece1XY.value = [1, 4]
            playerPiece2XY.value = [1, 5]
            playerPiece3XY.value = [1, 6]
            playerPiece4XY.value = [0, 5]
            drawBlock.value = ['T']
            break
    }
    playerGravity
}

onMounted(() => {
    pieceInit()
})

</script>

<template>
    <div id="game" class="d-flex justify-center">
        <div class="stats d-flex flex-column justify-end">
            <StatDisplay/>
        </div>
        <div id="board" class="board d-flex flex-column"> 
            <div class="d-flex flex-row" v-for="(row, rowIdx) in board" :key="rowIdx">
                <div class="cell hide-font" 
                v-for="(item, colIdx) in row" :key="colIdx" 
                :class="rowIdx < 4 ? 'hidden' : getTetrominoColor(item)"
                >
                    {{ item }}
                </div>
            </div>
        </div>
        <span class="nextBlock">
            <NextDisplay/>
        </span>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@200&display=swap');

#game{
    width: 50vw;
    padding-top: 50px;
}

.hidden{
    display: none;
}

.nextBlock{
    justify-self: start;
    margin-top: 20px;
    margin-bottom: auto;
}
.stats{
    margin-bottom: 20px;
    align-self: end;
    text-align: right;
}
.board{
    margin:20px;
    border-radius: 4px;
    border: solid 1px #D5D6D8;
    border-style: none solid none solid;
    font-family:'Roboto Mono', monospace;
    font-size: 12px;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
    }

.cell{
    height: 30px;
    width: 30px;
    text-align: center;
    user-select: none;
    line-height: 4px;

}

.emptyCell{
    font-size: 40px;
}
.tetrominoI{
    background-image: linear-gradient(#68EFCE, #4DB5FA);
    border: solid 1px white;
    border-radius: 4px;
    color: rgba(255,255,255, 0);
}

.tetrominoL{
    background-image: linear-gradient(#3F83E9, #6B2ED3);
    border: solid 1px white;
    border-radius: 4px;
    color: rgba(255,255,255, 0);
}

.tetrominoJ{
    background-image: linear-gradient(#F0853C, #E1520D);
    border: solid 1px white;
    border-radius: 4px;
    color: rgba(255,255,255, 0);
}

.tetrominoO{
    background-image: linear-gradient(#FFE080, #FFAF78);
    border: solid 1px white;
    border-radius: 4px;
    color: rgba(255,255,255, 0);
}

.tetrominoS{
    background-image: linear-gradient(#02EA45, #369739);
    border: solid 1px white;
    border-radius: 4px;
    color: rgba(255,255,255, 0);
}

.tetrominoZ{
    background-image: linear-gradient(#ED354C, #A41E36);
    border: solid 1px white;
    border-radius: 4px;
    color: rgba(255,255,255, 0);
}

.tetrominoT{
    background-image: linear-gradient(#AE00D5, #7A0BB3);
    border: solid 1px white;
    border-radius: 4px;
    color: rgba(255,255,255, 0);
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
import NextDisplay from './stat-display/NextDisplay.vue'
import StatDisplay from './stat-display/StatDisplay.vue'
import {board, getTetrominoColor, isString, getRandomTetromino} from "@/components/game/game";

const playerPiece1XY = ref([0, 0])
const playerPiece2XY = ref([0, 0])
const playerPiece3XY = ref([0, 0])
const playerPiece4XY = ref([0, 0])

// const shadow1 = ref([0, 0])
// const shadow2 = ref([0, 0])
// const shadow3 = ref([0, 0])
// const shadow4 = ref([0, 0])

let playerPiece = ''

const drawBlock = ref([' '])
const drawShadow = ref([' '])
const hardDropTime = ref(0)
const time = ref(1000)
const rotationTracker = ref(0)

const left = ref('ArrowLeft')
const right = ref('ArrowRight')
const hardDropKey = ref('ArrowUp')
const softDropKey = ref('ArrowDown')
const rotateLeft = ref('z')
const rotateRight = ref('x')
const rotationCounter = ref(0)

window.addEventListener('keydown', (e) => {
    const key = e.key
    if (key === left.value || key === right.value){
        movePieceX(key)
    }
    else if (key === hardDropKey.value){
        hardDrop()
    } else if (key === softDropKey.value){
        softDrop()
    } else if(key === rotateLeft.value || key === rotateRight.value){
        rotationLeft(key)
    }
    console.log(key)
})

const softDrop = () => {
    gravity()
}

const hardDrop = () => {
    clearInterval(playerGravity)
    playerGravity = setInterval(gravity, hardDropTime.value)
}

const rotationI0 = () => {
    (board.value)[(playerPiece1XY.value)[0]][(playerPiece1XY.value)[1]] = '.';
    (board.value)[(playerPiece2XY.value)[0]][(playerPiece2XY.value)[1]] = '.';
    (board.value)[(playerPiece4XY.value)[0]][(playerPiece4XY.value)[1]] = '.';

    ((playerPiece1XY.value)[0]) = ((playerPiece3XY.value)[0]);
    ((playerPiece2XY.value)[0]) = ((playerPiece3XY.value)[0]);
    ((playerPiece4XY.value)[0]) = ((playerPiece3XY.value)[0]);

    ((playerPiece1XY.value)[1]) = ((playerPiece3XY.value)[1] - 2);
    ((playerPiece2XY.value)[1]) = ((playerPiece3XY.value)[1] - 1);
    ((playerPiece4XY.value)[1]) = ((playerPiece3XY.value)[1] + 1);

    (board.value)[(playerPiece1XY.value)[0]][(playerPiece1XY.value)[1]] = drawBlock.value;
    (board.value)[(playerPiece2XY.value)[0]][(playerPiece2XY.value)[1]] = drawBlock.value;
    (board.value)[(playerPiece4XY.value)[0]][(playerPiece4XY.value)[1]] = drawBlock.value;
}

const rotationI1 = () => {
    (board.value)[(playerPiece1XY.value)[0]][(playerPiece1XY.value)[1]] = '.';
    (board.value)[(playerPiece2XY.value)[0]][(playerPiece2XY.value)[1]] = '.';
    (board.value)[(playerPiece4XY.value)[0]][(playerPiece4XY.value)[1]] = '.';

    ((playerPiece1XY.value)[1]) = ((playerPiece3XY.value)[1]);
    ((playerPiece2XY.value)[1]) = ((playerPiece3XY.value)[1]);
    ((playerPiece4XY.value)[1]) = ((playerPiece3XY.value)[1]);

    ((playerPiece1XY.value)[0]) = ((playerPiece3XY.value)[0] - 2);
    ((playerPiece2XY.value)[0]) = ((playerPiece3XY.value)[0] - 1);
    ((playerPiece4XY.value)[0]) = ((playerPiece3XY.value)[0]) + 1;

    (board.value)[(playerPiece1XY.value)[0]][(playerPiece1XY.value)[1]] = drawBlock.value;
    (board.value)[(playerPiece2XY.value)[0]][(playerPiece2XY.value)[1]] = drawBlock.value;
    (board.value)[(playerPiece4XY.value)[0]][(playerPiece4XY.value)[1]] = drawBlock.value;
}

function rotationLeft(key : any) {
    if(key === rotateLeft.value){
        rotationCounter.value--
    }else{
        rotationCounter.value++
    }
    switch(playerPiece){
        case 'I':
            if(rotationCounter.value === -1){
                rotationCounter.value = 1
            } else if(rotationCounter.value === 2){
                rotationCounter.value = 0
            }
            if(rotationCounter.value === 1){
                rotationI1()
            }
            else{
                rotationI0()
            }
    }
}

const rotationCollision = () => {
    if(
        (((board.value)[(playerPiece1XY.value)[0]][(playerPiece1XY.value)[1] + 1] !== '.' 
        && isString((board.value)[(playerPiece1XY.value)[0]][(playerPiece1XY.value)[1] + 1])))
        || (((board.value)[(playerPiece2XY.value)[0]][(playerPiece2XY.value)[1] + 1] !== '.' 
        && isString((board.value)[(playerPiece2XY.value)[0]][(playerPiece2XY.value)[1] + 1])))
        || (((board.value)[(playerPiece3XY.value)[0]][(playerPiece3XY.value)[1] + 1] !== '.' 
        && isString((board.value)[(playerPiece3XY.value)[0]][(playerPiece3XY.value)[1] + 1])))
        || (((board.value)[(playerPiece4XY.value)[0]][(playerPiece4XY.value)[1] + 1] !== '.' 
        && isString((board.value)[(playerPiece4XY.value)[0]][(playerPiece4XY.value)[1] + 1])))
    ){
        return false
    } else if(
        (playerPiece1XY.value)[1] > 8
        || (playerPiece2XY.value)[1] > 8
        || (playerPiece3XY.value)[1] > 8
        || (playerPiece4XY.value)[1] > 8){
        return false
    } else if(
        (((board.value)[(playerPiece1XY.value)[0]][(playerPiece1XY.value)[1] - 1] !== '.' 
        && isString((board.value)[(playerPiece1XY.value)[0]][(playerPiece1XY.value)[1] - 1])))
        || (((board.value)[(playerPiece2XY.value)[0]][(playerPiece2XY.value)[1] - 1] !== '.' 
        && isString((board.value)[(playerPiece2XY.value)[0]][(playerPiece2XY.value)[1] - 1])))
        || (((board.value)[(playerPiece3XY.value)[0]][(playerPiece3XY.value)[1] - 1] !== '.' 
        && isString((board.value)[(playerPiece3XY.value)[0]][(playerPiece3XY.value)[1] - 1])))
        || (((board.value)[(playerPiece4XY.value)[0]][(playerPiece4XY.value)[1] - 1] !== '.' 
        && isString((board.value)[(playerPiece4XY.value)[0]][(playerPiece4XY.value)[1] - 1])))
    ){
        return false
    }  else if(
        (playerPiece1XY.value)[1] < 1
        || (playerPiece2XY.value)[1] < 1
        || (playerPiece3XY.value)[1] < 1
        || (playerPiece4XY.value)[1] < 1){
            return false
        }
    else{
        return true
    }
}

function movePieceX(key : any){
    if(key === right.value){
        if(
            (((board.value)[(playerPiece1XY.value)[0]][(playerPiece1XY.value)[1] + 1] !== '.' 
            && isString((board.value)[(playerPiece1XY.value)[0]][(playerPiece1XY.value)[1] + 1])))
            || (((board.value)[(playerPiece2XY.value)[0]][(playerPiece2XY.value)[1] + 1] !== '.' 
            && isString((board.value)[(playerPiece2XY.value)[0]][(playerPiece2XY.value)[1] + 1])))
            || (((board.value)[(playerPiece3XY.value)[0]][(playerPiece3XY.value)[1] + 1] !== '.' 
            && isString((board.value)[(playerPiece3XY.value)[0]][(playerPiece3XY.value)[1] + 1])))
            || (((board.value)[(playerPiece4XY.value)[0]][(playerPiece4XY.value)[1] + 1] !== '.' 
            && isString((board.value)[(playerPiece4XY.value)[0]][(playerPiece4XY.value)[1] + 1])))
        ){
            //pass
        }
        else if(
        (playerPiece1XY.value)[1] > 8
        || (playerPiece2XY.value)[1] > 8
        || (playerPiece3XY.value)[1] > 8
        || (playerPiece4XY.value)[1] > 8){
        //pass
    }
        else{
            (board.value)[(playerPiece1XY.value)[0]][(playerPiece1XY.value)[1]] = '.';
            (board.value)[(playerPiece2XY.value)[0]][(playerPiece2XY.value)[1]] = '.';
            (board.value)[(playerPiece3XY.value)[0]][(playerPiece3XY.value)[1]] = '.';
            (board.value)[(playerPiece4XY.value)[0]][(playerPiece4XY.value)[1]] = '.';

            ((playerPiece1XY.value)[1]) = ((playerPiece1XY.value)[1]) + 1;
            ((playerPiece2XY.value)[1]) = ((playerPiece2XY.value)[1]) + 1;
            ((playerPiece3XY.value)[1]) = ((playerPiece3XY.value)[1]) + 1;
            ((playerPiece4XY.value)[1]) = ((playerPiece4XY.value)[1]) + 1;

            (board.value)[(playerPiece1XY.value)[0]][(playerPiece1XY.value)[1]] = drawBlock.value;
            (board.value)[(playerPiece2XY.value)[0]][(playerPiece2XY.value)[1]] = drawBlock.value;
            (board.value)[(playerPiece3XY.value)[0]][(playerPiece3XY.value)[1]] = drawBlock.value;
            (board.value)[(playerPiece4XY.value)[0]][(playerPiece4XY.value)[1]] = drawBlock.value;
        }
    } else if(key === left.value){
        if(
            (((board.value)[(playerPiece1XY.value)[0]][(playerPiece1XY.value)[1] - 1] !== '.' 
            && isString((board.value)[(playerPiece1XY.value)[0]][(playerPiece1XY.value)[1] - 1])))
            || (((board.value)[(playerPiece2XY.value)[0]][(playerPiece2XY.value)[1] - 1] !== '.' 
            && isString((board.value)[(playerPiece2XY.value)[0]][(playerPiece2XY.value)[1] - 1])))
            || (((board.value)[(playerPiece3XY.value)[0]][(playerPiece3XY.value)[1] - 1] !== '.' 
            && isString((board.value)[(playerPiece3XY.value)[0]][(playerPiece3XY.value)[1] - 1])))
            || (((board.value)[(playerPiece4XY.value)[0]][(playerPiece4XY.value)[1] - 1] !== '.' 
            && isString((board.value)[(playerPiece4XY.value)[0]][(playerPiece4XY.value)[1] - 1])))
        ){
            //pass
        } else if(
        (playerPiece1XY.value)[1] < 1
        || (playerPiece2XY.value)[1] < 1
        || (playerPiece3XY.value)[1] < 1
        || (playerPiece4XY.value)[1] < 1){
            //pass
        }
        else{
            (board.value)[(playerPiece1XY.value)[0]][(playerPiece1XY.value)[1]] = '.';
            (board.value)[(playerPiece2XY.value)[0]][(playerPiece2XY.value)[1]] = '.';
            (board.value)[(playerPiece3XY.value)[0]][(playerPiece3XY.value)[1]] = '.';
            (board.value)[(playerPiece4XY.value)[0]][(playerPiece4XY.value)[1]] = '.';

            ((playerPiece1XY.value)[1]) = ((playerPiece1XY.value)[1]) - 1;
            ((playerPiece2XY.value)[1]) = ((playerPiece2XY.value)[1]) - 1;
            ((playerPiece3XY.value)[1]) = ((playerPiece3XY.value)[1]) - 1;
            ((playerPiece4XY.value)[1]) = ((playerPiece4XY.value)[1]) - 1;

            (board.value)[(playerPiece1XY.value)[0]][(playerPiece1XY.value)[1]] = drawBlock.value;
            (board.value)[(playerPiece2XY.value)[0]][(playerPiece2XY.value)[1]] = drawBlock.value;
            (board.value)[(playerPiece3XY.value)[0]][(playerPiece3XY.value)[1]] = drawBlock.value;
            (board.value)[(playerPiece4XY.value)[0]][(playerPiece4XY.value)[1]] = drawBlock.value;
        }
    }
}

const gravity = () => {
    if(!collisionDetection()){
        clearInterval(playerGravity)
        playerGravity = setInterval(gravity, time.value)
        pieceInit()
    }

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
        (((board.value)[(playerPiece1XY.value)[0] + 1][(playerPiece1XY.value)[1]] !== '.' 
            && isString((board.value)[(playerPiece1XY.value)[0] + 1][(playerPiece1XY.value)[1]])))
        || (((board.value)[(playerPiece2XY.value)[0] + 1][(playerPiece2XY.value)[1]] !== '.' 
            && isString((board.value)[(playerPiece2XY.value)[0] + 1][(playerPiece2XY.value)[1]])))
        || (((board.value)[(playerPiece3XY.value)[0] + 1][(playerPiece3XY.value)[1]] !== '.' 
            && isString((board.value)[(playerPiece3XY.value)[0] + 1][(playerPiece3XY.value)[1]])))
        || ((((board.value)[(playerPiece4XY.value)[0] + 1][(playerPiece4XY.value)[1]] !== '.')
            && isString((board.value)[(playerPiece4XY.value)[0] + 1][(playerPiece4XY.value)[1]]))))
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
    const currPiece = "I"
    playerPiece = currPiece
    switch(currPiece){
        case "I":
            playerPiece1XY.value = [2, 3]
            playerPiece2XY.value = [2, 4]
            playerPiece3XY.value = [2, 5]
            playerPiece4XY.value = [2, 6]
            drawBlock.value = ['I']
            drawShadow.value = ['sI']
            break
        case "O":
            playerPiece1XY.value = [1, 4]
            playerPiece2XY.value = [1, 5]
            playerPiece3XY.value = [2, 4]
            playerPiece4XY.value = [2, 5]
            drawBlock.value = ['O']
            drawShadow.value = ['sO']
            break
        case "J":
            playerPiece1XY.value = [0, 4]
            playerPiece2XY.value = [1, 4]
            playerPiece3XY.value = [1, 5]
            playerPiece4XY.value = [1, 6]
            drawBlock.value = ['J']
            drawShadow.value = ['sJ']
            break
        case "L":
            playerPiece1XY.value = [1, 4]
            playerPiece2XY.value = [1, 5]
            playerPiece3XY.value = [1, 6]
            playerPiece4XY.value = [0, 6]
            drawBlock.value = ['L']
            drawShadow.value = ['sL']
            break
        case "S":
            playerPiece1XY.value = [1, 4]
            playerPiece2XY.value = [1, 5]
            playerPiece3XY.value = [0, 5]
            playerPiece4XY.value = [0, 6]
            drawBlock.value = ['S']
            drawShadow.value = ['sS']
            break
        case "Z":
            playerPiece1XY.value = [0, 4]
            playerPiece2XY.value = [0, 5]
            playerPiece3XY.value = [1, 5]
            playerPiece4XY.value = [1, 6]
            drawBlock.value = ['Z']
            drawShadow.value = ['sZ']
            break
        case "T":
            playerPiece1XY.value = [1, 4]
            playerPiece2XY.value = [1, 5]
            playerPiece3XY.value = [1, 6]
            playerPiece4XY.value = [0, 5]
            drawBlock.value = ['T']
            drawShadow.value = ['sT']
            break
    }
    playerGravity
    }

pieceInit()

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

.overlayButton{
    position: absolute;
    opacity: 50%;
    color: black;
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
    border: solid 2px #D5D6D8;
    border-style: none solid solid solid;
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
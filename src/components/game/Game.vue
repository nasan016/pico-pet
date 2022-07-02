<script setup lang="ts">
import NextDisplay from './stat-display/NextDisplay.vue'
import StatDisplay from './stat-display/StatDisplay.vue'

const playFieldWidht : number = 10
const playFieldHeight : number = 20

</script>

<template>
    <div id="game" class="d-flex justify-center">
        <div class="stats d-flex flex-column justify-end">
        <StatDisplay/>
        </div>
        <div class="board d-flex"> 
            <div v-for="i in 10" :key="i">
                <div class="cell" v-for="j in 20" :key="j">
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
    border-radius: 6px;
    font-family:'Roboto Mono', monospace;
    font-size: 12px;
    background-color: #ebedea;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
    }

.cell{
    height: 28px;
    width: 28px;
    border-radius: 4px;
}
</style>

<script setup lang="ts">

const props = defineProps({
    title: String,
})
</script>

<template>
<div class="menuButton ma-2">
{{title}}
</div>
</template>

<style scoped>
.menuButton{
    text-transform: uppercase;
    border: solid white;
    color: white;
    width: 500px;
    text-align: center;
    height: 50px;
    line-height: 45px;
    font-size: 25px;
    transition: all 0.1s ease-in-out;
    cursor: pointer;
}

.menuButton:hover{
    color: red;
}
</style>
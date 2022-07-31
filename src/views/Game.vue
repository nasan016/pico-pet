<script setup lang="ts">
import Bars from "../components/Bars.vue"
</script>

<template>
<div class="d-flex flex-column align-center justify-center test">
    <Bars title="hunger" progress=90 barColor="orange"/>
    <Bars title="wellness" progress=52 barColor="pink"/>
    <Bars title="boredom" progress=30 barColor="green"/>
</div>
</template>

<style scoped>
.test{
    border: 2px solid white;
    height: 210px;
    width: 496px;
}
</style>
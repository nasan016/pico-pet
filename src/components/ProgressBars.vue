<script setup lang="ts">
import Bars from "../components/Bars.vue"
</script>

<template>
<div class="pa-3">
    <div class="d-flex flex-column align-center justify-center test">
        <Bars title="hunger" progress=85 barColor="orange"/>
        <Bars title="wellness" progress=44 barColor="pink"/>
        <Bars title="boredom" progress=96 barColor="green"/>
    </div>
</div>
</template>

<style scoped>
.test{
    border: 2px solid white;
    height: 210px;
    width: 496px;
}
</style>
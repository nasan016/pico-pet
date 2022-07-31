<script setup lang="ts">
import ProgressBars from "../components/ProgressBars.vue"
import ChatBox from "../components/ChatBox.vue"
</script>

<template>
<div class="game d-flex flex-row justify-space-between">
    <ProgressBars/>
    <ChatBox/>
</div>
</template>

<style scoped>
.game{
    width: 100%;
}
</style>
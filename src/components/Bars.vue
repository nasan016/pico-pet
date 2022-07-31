<script setup lang="ts">

const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    progress: {
        type: Number,
        required: true,
    },
    barColor: {
        type: String,
        required: true,
    }
})

</script>

<template>
<div class="pb-2">
<div class="barTitle">
    {{title}}
</div>
<div class="progressBar">
    <v-progress-linear
            v-model="progress"
            height="30"
            :color=barColor
        />
</div>
</div>
</template>

<style scoped>
.barTitle{
    font-size: 14px;
    text-transform: uppercase;
}

.progressBar{
    width: 480px;
    border: 3px solid white;
}
</style>
<script setup lang="ts">
</script>

<template>
<div class="back">
  <div class="d-flex justify-end pr-14">
    <router-link to="/"  style="text-decoration: none; color: inherit;">
      <div class="backButton">X</div>
    </router-link>
  </div>
<div class="d-flex flex-column credits align-center justify-center">
  <div style="color:orange">
    Created By:
  </div>
  <br/>
  <div>
    Nathaniel Macapinlac
  </div>
  <br/>
  <br/>
  <div style="color:orange">
    Made using:
  </div>
  <br/>
  <div>
    Vue.js
  </div>
  <div>
    TypeScript
  </div>
  <div>
    Electron
  </div>
</div>
</div>
</template>

<style scoped>
.credits{
  height: 90vh;
}

.back{
  width: 100%;
}

.backButton{
  font-size: 20px;
  height: 40px;
  width: 40px;
  border: solid white;
  text-align: center;
  line-height: 35px;
  padding-left: 2px;
  cursor: pointer;
  user-select: none;
}

.backButton:hover{
  color: orange;
}
</style>
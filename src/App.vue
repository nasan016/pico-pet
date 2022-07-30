<script setup lang="ts">
</script>

<template>
<div>
  <div class="navbar d-flex justify-end">
    <router-link to="/"  class="title justify-start" style="text-decoration: none; color: inherit;">
      <div v-ripple>
        APP 
      <v-divider vertical/>  
      </div>
    </router-link>
    <router-link to="/ERROR"  style="text-decoration: none; color: inherit;">
      <div v-ripple>
        ERROR 
      <v-divider vertical/>  
      </div>
    </router-link>
    <router-link to="/about"  style="text-decoration: none; color: inherit;">
    <div v-ripple>
      ABOUT 
    <v-divider vertical/>  
    </div>
  </router-link>
  </div>
  <div class="d-flex justify-center">
    <div class="d-flex align-center justify-center routerContainer">
      <router-view v-slot="{Component}">
      <transition name="slide-fade" mode="out-in">
        <component :is="Component"/>
      </transition>
      </router-view>
    </div>

  </div>
</div>
</template>

<style>
@import './assets/base.css';
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

#app{
font-family: 'Press Start 2P', cursive;
background: black;
color: white;
height: 100vh;
}
</style>
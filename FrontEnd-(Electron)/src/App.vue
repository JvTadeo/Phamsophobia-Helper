<template>
  <router-view v-if="$route.meta.standalone" />
  <MainLayout v-else />
</template>

<script setup lang="ts">
import MainLayout from './layout/MainLayout.vue';
</script>

<style>
#app {
  width: 100vw;
  height: 100vh;
  background-color: #121212;
}
</style>
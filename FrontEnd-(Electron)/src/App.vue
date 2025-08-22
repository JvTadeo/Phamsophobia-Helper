<template>
  <router-view v-if="$route.meta.standalone" />
  <MainLayout v-else />
</template>

<script setup lang="ts">
import MainLayout from './layout/MainLayout.vue';
</script>

<style>
#app {
  width: 100dvw;
  height: 100dvh;
  background-color: #1F1F1F;
  box-sizing: border-box;
}
</style>
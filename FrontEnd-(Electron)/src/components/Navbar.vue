<template>
  <div class="w-full h-full flex flex-row gap-2 overflow-auto no-drag">
    <Button
      v-for="item in sideBar.items"
      variant="secondary"
      :key="item.name"
      @click="$router.push(item.route)"
    >
      <component :is="item.icon" />
      {{ item.name }}
    </Button>
  </div>
</template>

<script setup lang="ts">
import { Button } from './ui/button';
import { useNavbarStore } from '@/stores/navbarStore';

const sideBar = useNavbarStore();
</script>
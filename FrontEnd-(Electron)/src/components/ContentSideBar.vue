<template>
  <div class="w-full h-full flex flex-col space-y-2 p-2 bg-[#FFF7D0]">
    <Button
      v-for="item in sidebarStore.items"
      :key="item.name"
      variant="ghost"
      class="flex flex-row itens-center gap-2 justify-start"
      @click="item.action"
    >
      <component :is="item.icon"/>
      <p class="text-lg">{{ item.name }}</p>
    </Button>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { useSidebarStore } from '@/stores/siderbarStore';

const sidebarStore = useSidebarStore();
</script>
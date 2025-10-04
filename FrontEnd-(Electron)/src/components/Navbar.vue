<template>
  <div class="w-full h-full flex flex-row gap-2 overflow-auto no-drag">
    <Button
      v-for="item in sideBar.items"
      variant="secondary"
      :key="item.name"
      @click="$router.push(item.route)"
      class="cursor-pointer"
    >
      <component :is="item.icon" />
      {{ t(item.name) }}
    </Button>
  </div>
</template>

<script setup lang="ts">
import { Button } from './ui/button';
import { useNavbarStore } from '@/stores/navbarStore';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const sideBar = useNavbarStore();
</script>
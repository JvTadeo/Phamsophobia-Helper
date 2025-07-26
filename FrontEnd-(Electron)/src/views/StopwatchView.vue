<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen w-full bg-[#FFF7D0] p-6"
    style="-webkit-app-region: drag"
  >
    <div class="flex flex-col items-center space-y-2 w-full">
      <!-- Timer -->
      <h3 class="text-4xl text-center">{{ stopwatchStore.formattedTime }}</h3>
      <!-- Progress Bar -->
      <section class="w-full relative">
        <Progress class="w-full" :model-value="stopwatchStore.progressValue" />
        <div
          v-for="item in stopwatchStore.timerDividers"
          :key="item.label"
          class="absolute flex flex-col items-center"
          :style="{ left: `${item.position}px`, transform: 'translateX(-50%)', top: '-3px' }"
        >
          <div class="w-[2px] h-4 bg-black rounded-full" />
          <p class="text-md mt-1">{{ item.label }}</p>
        </div>
        <!-- Space to Labels -->
        <div class="h-6"></div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Progress } from '@/components/ui/progress';
import { onMounted } from 'vue';
import { useStopwatchStore } from '@/stores/stopwatchStore';

const stopwatchStore = useStopwatchStore();

onMounted(() => {
  if (window.electronAPI?.onF1Pressed) {
      window.electronAPI.onF1Pressed(() => {
          stopwatchStore.handleStopwatchState();
      });    
  }
  
})

</script>
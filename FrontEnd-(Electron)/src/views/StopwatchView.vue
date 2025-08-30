<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen w-full bg-[#1F1F1F] p-2 drag"
  >
    <div class="flex flex-col items-center space-y-2 w-full text-amber-50 bg-[#404040] inner-shadow-custom rounded-2xl p-4">
      <!-- Timer -->
      <h3 class="text-3xl text-center">{{ stopwatchStore.formattedTime }}</h3>
      <!-- Progress Bar -->
      <section class="w-full relative">
        <Progress
          class="w-full"
          :model-value="stopwatchStore.progressValue"
        />
        <div
          v-for="item in stopwatchStore.timerDividers"
          :key="item.label"
          class="absolute flex flex-col items-center"
          :style="{ left: `${item.position}px`, transform: 'translateX(-50%)', top: '-3px' }"
        >
          <div class="w-[2px] h-4 bg-amber-50 rounded-full" />
          <p class="text-sm mt-1">{{ item.label }}</p>
        </div>
        <!-- Space to Labels -->
        <div class="h-5"></div>
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
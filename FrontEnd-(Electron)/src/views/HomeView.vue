<template>
  <div class="text-amber-50 flex flex-col space-y-4">
    <Card
      v-for="i in useHomeStore().newsData"
      :key="i.id"
      class="bg-[#808C72] border-none cursor-pointer"
      @click="useHomeStore().openLink(i.url)"
    >
      <CardHeader>
        <CardTitle class="text-xl text-amber-50">{{ i.title }}</CardTitle>
        <CardDescription
          class="text-sm text-accent-foreground"
        >
          {{ i.author }} - {{ new Date(i.publishedAt).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) }}
        </CardDescription>
      </CardHeader>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useHomeStore } from '@/stores/homeStore';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

onMounted(async () => {
  await useHomeStore().getNews();
})
</script>
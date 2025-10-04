<template>
  <router-view v-if="$route.meta.standalone" />
  <MainLayout v-else />
</template>

<script setup lang="ts">
import { onBeforeMount, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { axiosCustom } from "@/api/AxiosCustom";
import { useLanguageStore } from '@/stores/languageStore';
import { useHomeStore } from './stores/homeStore';
import { eventBus } from '@/events/eventBus';
import MainLayout from '@/layout/MainLayout.vue';

const languageStore = useLanguageStore();
const route = useRoute();
const { locale } = useI18n();

onBeforeMount(async () => {
  // Check if there is a language in local storage
  const localeSaved = localStorage.getItem('language') || 'en'  

  languageStore.changeLanguage(localeSaved);
  locale.value = languageStore.languageSelected.code

  axiosCustom.defaults.headers.common['language_code'] = locale.value

  // Player Count
  await useHomeStore().getPlayerCount()
})
watch (() => languageStore.languageSelected, (value) => {
  locale.value = value.code;
  // Change the language
  axiosCustom.defaults.headers.common['language_code'] = locale.value
  // Send Events
  eventBus.emit('language-changed', {
    path: route.fullPath
  });
})

</script>

<style>
#app {
  width: 100dvw;
  height: 100dvh;
  background-color: #1F1F1F;
  box-sizing: border-box;
}
</style>
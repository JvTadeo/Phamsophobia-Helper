<template>
  <div class="w-full flex flex-row h-full py-2 items-center">
    <!-- Icon -->
    <section class="grow flex flex-row items-center gap-2">
      <Avatar @click="$router.push('/')" class="cursor-pointer">
        <AvatarImage :src="IPhasmophobia" />
        <AvatarFallback>P</AvatarFallback>
      </Avatar>
      <!-- Title -->
      <section class="flex flex-col w-full">
        <h1 class="text-2xl text-amber-50">Phasmophobia Helper</h1>
        <p class="text-stone-400">/{{ $route.name }}</p>
      </section>
    </section>
    <!-- Players Count -->
    <section class="flex flex-row gap-2 items-center text-amber-50 h-full">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            {{ useHomeStore().playerCount.toLocaleString('pt-BR') }}
          </TooltipTrigger>
          <TooltipContent>
            <p>{{ t('Steam.playerCount') }}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Signal :size="32" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { Signal } from 'lucide-vue-next';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useHomeStore } from '@/stores/homeStore';
import { useI18n } from 'vue-i18n';

import IPhasmophobia from '@/../public/I_Phasmophobia.png';

const { t } = useI18n();
</script>
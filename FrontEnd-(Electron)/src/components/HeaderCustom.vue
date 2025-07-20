<template>
  <div class="w-full flex flex-row h-12 p-2 items-center gap-2">
    <!-- Drawer -->
    <Drawer
      direction="left"
    >
      <DrawerTrigger>
        <Menu class="text-amber-50" />
      </DrawerTrigger>
      <DrawerContent>
        <ContentSideBar/>
      </DrawerContent>
    </Drawer>
    <!-- Separator -->
    <Separator orientation="vertical" class="h-full" />
    <!-- Icon -->
    <Avatar>
      <AvatarImage src="src/assets/images/I_Phasmophobia.png" />
      <AvatarFallback>P</AvatarFallback>
    </Avatar>
    <!-- Title -->
    <h1 class="text-2xl text-amber-50">Phasmophobia Helper</h1>
  </div>
</template>

<script setup lang="ts">
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Menu } from 'lucide-vue-next';
import ContentSideBar from './ContentSideBar.vue';
</script>
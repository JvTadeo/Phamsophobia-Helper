<template>
    <div class="w-full h-full flex flex-col mx-2">
        <!-- NavBar -->
        <NavBarCustom/>
        <!-- Body -->
        <div class="flex-1">
            <router-view/>
        </div>
    </div>    
</template>

<script setup lang="ts">
import NavBarCustom from '@/components/navbar/NavBarCustom.vue';
</script>
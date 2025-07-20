<template>
    <div class="flex flex-col px-2">
        <!-- NavBar & Header -->
        <HeaderCustom/>
        <!-- Body -->
        <div class="flex-1">
            <router-view/>
        </div>
    </div>    
</template>

<script setup lang="ts">
import HeaderCustom from '@/components/HeaderCustom.vue';
</script>

<style scoped>
</style>
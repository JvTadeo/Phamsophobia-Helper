<template>
    <div class="flex flex-col space-y-2">
        <Button
            v-for="item in toolBox.itens"
            :key="item.name"
            variant="secondary"
            @click="item.action"
        >
            <component :is="item.icon" />
            {{ item.name }}
        </Button>
    </div>
</template>

<script setup lang="ts">
import { useToolBoxStore } from '@/stores/toolboxStore';
import { Button } from '@/components/ui/button';

const toolBox = useToolBoxStore();
</script>
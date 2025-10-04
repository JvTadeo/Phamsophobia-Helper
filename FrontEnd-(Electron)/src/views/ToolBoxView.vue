<template>
	<div class="flex flex-col space-y-2">
		<Button
			v-for="item in toolBox.itens"
			variant="default"
			class="cursor-pointer bg-[#1F1F1F] text-2xl flex justify-between items-center"
			:key="item.name"
			@click="item.action"
		>
			<component
				:is="item.icon"
				class="mr-2"
				stroke-width="2"
			/>
			{{ t(item.name) }}
      <TooltipProvider
				v-if="item.tooltip"
			>
        <Tooltip>
          <TooltipTrigger>
            <Info
							stroke-width="2"
						/>
          </TooltipTrigger>
          <TooltipContent>
            <p>{{ t(`${item.tooltip}`) }}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>			
		</Button>
	</div>
</template>

<script setup lang="ts">
import { Info } from 'lucide-vue-next';
import { useToolBoxStore } from '@/stores/toolboxStore';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const toolBox = useToolBoxStore();
</script>
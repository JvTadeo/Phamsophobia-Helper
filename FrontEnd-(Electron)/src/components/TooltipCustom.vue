<template>
	<TooltipProvider>
		<Tooltip>
			<TooltipTrigger>
				<slot />
			</TooltipTrigger>
			<TooltipContent>
				<p :class="props.class" >{{ props.tooltip }}</p>
			</TooltipContent>
		</Tooltip>
	</TooltipProvider>
</template>

<script setup lang="ts">
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from '@/components/ui/tooltip'

const props = defineProps({
	tooltip: {
		type: String,
		default: ''
	},
	class: {
		type: String,
		default: ''
	}
})

</script>
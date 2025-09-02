<template>
	<div class="flex flex-col text-amber-50 space-y-4">
		<Accordion
			type="single"
			v-for="type in mediaStore.types"
			collapsible
		>
			<AccordionItem :value="type.id">
				<AccordionTrigger class="text-2xl py-2 px-6">
					{{ type.name }}
				</AccordionTrigger>
				<AccordionContent
					class="flex flex-col gap-2"
				>
					<section
						v-for="item  in type.categories"
						class="flex flex-row bg-stone-800 rounded-md p-2 items-center"
					>
						<p class="text-lg w-full">{{ item.description }}</p>
						<div class="flex flex-row gap-2 text-lg pr-4">
							<p class="text-green-200">
								<TooltipCustom tooltip="Unique" class="text-amber-50 text-lg" >
									${{ item.uniqueRewardMoney }}/{{ item.uniqueRewardXp }}XP
								</TooltipCustom>
							</p>
							<p class="mx-2">|</p>
							<p class="text-red-200">
								<TooltipCustom tooltip="Duplicate" class="text-amber-50 text-lg" >
									${{ item.duplicateRewardMoney }}/{{ item.duplicateRewardXp }}XP
								</TooltipCustom>
							</p>
						</div>
					</section>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useMediaStore } from '@/stores/mediaStore';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import TooltipCustom from '@/components/TooltipCustom.vue';

const mediaStore = useMediaStore()

onMounted(async () => {
	await mediaStore.getMedias()
})

</script>
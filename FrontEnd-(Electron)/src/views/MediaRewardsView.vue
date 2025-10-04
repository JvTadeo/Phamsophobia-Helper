<template>
	<div>
		<div
			class="flex flex-col text-amber-50 space-y-2"
			v-if="!mediaStore.loading"
		>
			<!-- Filters -->
			<section class="flex flex-row w-full gap-2 sticky top-0 z-10 backdrop-blur">
				<div class="w-full items-center">
					<Input
						class="w-full bg-stone-900 border-0 text-amber-50 focus-visible:ring-0 pl-10"
						:placeholder="`${t('GenericActions.search')}...`"
						type="text"
						@update:model-value="mediaStore.filteredCategories($event.toString())"
					/>
					<span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
						<Search class="size-6 text-muted-foreground" />
					</span>
				</div>
			</section>
			<!-- Accordion -->
			<Accordion
				type="single"
				collapsible
				v-for="type in mediaStore.types"
				:model-value="type.expanded"
				@update:model-value="type.expanded = $event"
			>
				<AccordionItem
					:value="type.mediaType.id"
				>
					<AccordionTrigger
						class="text-2xl py-2 px-6 bg-stone-900 shadow-md rounded-t-2xl hover:bg-stone-800"
						:class="type.expanded ? '' : 'border-b-1 border-stone-400' "
					>
						{{ type.mediaType.name }}
					</AccordionTrigger>
					<AccordionContent
						class="flex flex-col gap-2 p-3 bg-stone-950/70 rounded-b-xl"
					>
						<section
							v-for="item in type.categoriesFiltered"
							class="flex justify-between items-center bg-stone-800 rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition"
						>
							<p class="text-lg font-medium">{{ item.name }}</p>
							<div class="grid grid-cols-2 gap-4 text-center text-sm">
								<div>
									<p class="text-green-300 font-bold">{{ t('MediaSection.unique') }}</p>
									<p>${{ item.uniqueRewardMoney }}/{{ item.uniqueRewardXp }}XP</p>
								</div>
								<div>
									<p class="text-red-300 font-bold">{{ t('MediaSection.duplicate') }}</p>
									<p>${{ item.duplicateRewardMoney }}/{{ item.duplicateRewardXp }}XP</p>
								</div>
							</div>
						</section>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
		<LoadingComponent v-if="mediaStore.loading" />
	</div>
</template>

<script setup lang="ts">
import { Search } from 'lucide-vue-next';
import { onMounted } from 'vue';
import { useMediaStore } from '@/stores/mediaStore';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Input } from '@/components/ui/input';
import { useI18n } from 'vue-i18n';
import LoadingComponent from '@/components/LoadingComponent.vue';

const { t } = useI18n();
const mediaStore = useMediaStore()

onMounted(async () => {
	await mediaStore.initStore();
})
</script>
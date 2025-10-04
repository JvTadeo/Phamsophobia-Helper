<template>
	<div class="h-full w-full flex px-6 justify-evenly flex-col drag">
		<!-- Actions Buttons -->
		<div class="self-end flex flex-row gap-4 no-drag">
			<span
				class="cursor-pointer px-4 text-amber-50 bg-gradient-to-t from-stone-600 from-[60%] to-transparent to-[60%]"
				@click="ghostStore.minimizeModalGhost()"
			>
				_
			</span>
			<span
				class="cursor-pointer px-4 text-amber-50 bg-gradient-to-t from-red-500 from-[60%] to-transparent to-[60%]"
				@click="ghostStore.closeModalGhost()"
			>
				X
			</span>
		</div>
		<!-- Body -->
		<div
			class="flex flex-col h-[90vh] w-full bg-[#404040] rounded-2xl p-4 space-y-4 inner-shadow-custom no-drag overflow-auto"
		>
			<!-- Content -->
			<section
				class="flex flex-col"
				v-if="!loading"
			>
				<!-- Header / Title / Evidences -->
				<section class="flex flex-row items-center justify-between">
					<p class="text-2xl text-amber-50" >{{ghostSelected.name}}</p>
					<!-- Evidences -->
					<div class="flex flex-row space-x-2">
						<TooltipProvider
							v-for="evidence in ghostSelected.evidences"
							:key="evidence.name"
						>
							<Tooltip>
								<TooltipTrigger as-child>
									<component
										:is="ghostStore.iconMap[evidence.icon]"
										:size="20"
										class="text-amber-50"
									/>
								</TooltipTrigger>
								<TooltipContent>
									<p class="text-sm">{{ evidence.name }}</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
				</section>
				<Separator orientation="horizontal" />
				<!-- Speed and Sanity -->
				<div class="flex w-full flex-row space-x-2 mt-2 text-amber-50">
					<!-- Sanity -->
					<section class="flex flex-row grow justify-between items-center bg-stone-900 p-1 space-x-4 rounded-sm">
						<Brain 
							class="self-auto text-red-400"
							:size="20"
						/>
						<div class="flex flex-row grow justify-around items-center">
							<p class="text-sm" v-if="ghostSelected.sanity.min != 0">{{ ghostSelected.sanity.min }}%</p>
							<p class="text-xl" >{{ ghostSelected.sanity.normal }}%</p>
							<p class="text-sm" v-if="ghostSelected.sanity.max != 0">{{ ghostSelected.sanity.max }}%</p>
						</div>
					</section>
					<!-- Speed -->
					<section class="flex flex-row grow justify-between items-center bg-stone-900 p-1 space-x-4 rounded-sm">
						<Footprints
							class="text-amber-50"
							:size="20"
						/>
						<div class="flex flex-row grow justify-around items-center">
							<p class="text-sm" v-if="ghostSelected.speed.min != 0">{{ ghostSelected.speed.min }}m/s</p>
							<p class="text-xl" >{{ ghostSelected.speed.normal }}m/s</p>
							<p class="text-sm" v-if="ghostSelected.speed.max != 0">{{ ghostSelected.speed.max }}m/s</p>
						</div>
					</section>
				</div>
				<!-- Details -->
				<section class="space-y-2 my-2">
					<!-- Tells -->
					<Accordion
						type="single"
						collapsible
						v-if="ghostSelected.details.tells.length > 0"
					>
						<AccordionItem
							value="tells"
						>
							<AccordionTrigger
								class="h-10 px-2 bg-stone-900 hover:bg-stone-800 text-amber-50 text-xl items-center flex rounded-t-sm"
							>
								{{ t('GhostInfoSection.tells') }}
							</AccordionTrigger>
							<AccordionContent
								class="flex flex-col gap-2 p-3 bg-stone-950/70"
							>
								<p
									v-for="item in ghostSelected.details.tells"
									:key="item"
									class="text-amber-50 text-[18px]"
								>
									- {{ item }}
								</p>					
							</AccordionContent>
						</AccordionItem>
					</Accordion>
					<!-- Abilities -->
					<Accordion
						type="single"
						collapsible
						v-if="ghostSelected.details.abilities.length > 0"
					>
						<AccordionItem
							value="abilities"
						>
							<AccordionTrigger
								class="h-10 px-2 bg-stone-900 hover:bg-stone-800 text-amber-50 text-xl items-center flex rounded-t-sm"
							>
								{{ t('GhostInfoSection.abilities') }}
							</AccordionTrigger>
							<AccordionContent
								class="flex flex-col gap-2 p-3 bg-stone-950/70"
							>
								<p
									v-for="item in ghostSelected.details.abilities"
									:key="item"
									class="text-amber-50 text-[18px]"
								>
									- {{ item }}
								</p>					
							</AccordionContent>
						</AccordionItem>
					</Accordion>
					<!-- Behaviours -->
					<Accordion
						type="single"
						collapsible
						v-if="ghostSelected.details.behaviours.length > 0"
					>
						<AccordionItem
							value="behaviours"
						>
							<AccordionTrigger
								class="h-10 px-2 bg-stone-900 hover:bg-stone-800 text-amber-50 text-xl items-center flex rounded-t-sm"
							>
								{{ t('GhostInfoSection.behaviours') }}
							</AccordionTrigger>
							<AccordionContent
								class="flex flex-col gap-2 p-3 bg-stone-950/70"
							>
								<p
									v-for="item in ghostSelected.details.behaviours"
									:key="item"
									class="text-amber-50 text-[18px]"
								>
									- {{ item }}
								</p>					
							</AccordionContent>
						</AccordionItem>
					</Accordion>
					<!-- Hunts -->
					<Accordion
						type="single"
						collapsible
						v-if="ghostSelected.details.hunt.length > 0"
					>
						<AccordionItem
							value="hunt"
						>
							<AccordionTrigger
								class="h-10 px-2 bg-stone-900 hover:bg-stone-800 text-amber-50 text-xl items-center flex rounded-t-sm"
							>
								{{ t('GhostInfoSection.hunt') }}
							</AccordionTrigger>
							<AccordionContent
								class="flex flex-col gap-2 p-3 bg-stone-950/70"
							>
								<p
									v-for="item in ghostSelected.details.hunt"
									:key="item"
									class="text-amber-50 text-[18px]"
								>
									- {{ item }}
								</p>					
							</AccordionContent>
						</AccordionItem>
					</Accordion>
					<Separator
						orientation="horizontal"
						class="my-2"
						v-if="ghostSelected.custom.length > 0"
					/>
					<!-- Custom -->
					<Accordion
						type="single"
						collapsible
						v-if="ghostSelected.custom.length > 0"
						v-for="details in ghostSelected.custom"
					>
						<AccordionItem
							:value="details.title"
						>
							<AccordionTrigger
								class="h-10 px-2 bg-stone-900 hover:bg-stone-800 text-amber-50 text-xl items-center flex rounded-t-sm"
							>
								{{ details.title }}
							</AccordionTrigger>
							<AccordionContent
								class="flex flex-col gap-2 p-3 bg-stone-950/70"
							>
								<p
									v-for="item in details.description"
									:key="item"
									class="text-amber-50 text-[18px]"
								>
									- {{ item }}
								</p>
								<img
									v-if="details.image"
									:src="details.image"
									:alt="details.title"
								/>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</section>
			</section>
			<!-- Loading -->
			<LoadingComponent v-if="loading" />
		</div>
	</div>
</template>

<script setup lang="ts">
import type { IGhost } from '@/interface/ghost.interface';
import { Brain, Footprints } from 'lucide-vue-next';
import { Separator } from '../ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { useGhostStore } from '@/stores/ghostStore';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import LoadingComponent from '../LoadingComponent.vue';

const { t, locale } = useI18n();
const ghostStore = useGhostStore();
const ghostSelected = ref<IGhost>({} as IGhost);
const loading = ref(true);

// On Loading has called
window.electronAPI.ghost.onLoading((data) => {
	loading.value = data;
})
// On Update Ghost Selected
window.electronAPI.ghost.onUpdate((data) => {
	// Loading
	loading.value = false;
	console.log(data);
	// Data
	ghostSelected.value = data;
});
// On Language Change
window.electronAPI.ghost.onLanguageUpdate(async (data) => {
	loading.value = true;

	const { id } = ghostSelected.value;
	await ghostStore.getGhostByIdIsolated(id, data)
	.then(({data}) => {
		ghostSelected.value = data;
	})
	locale.value = data;

	loading.value = false;
})

</script>
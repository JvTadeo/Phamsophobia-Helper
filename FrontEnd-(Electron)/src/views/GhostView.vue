<template>
	<div>
		<div
			class="flex flex-col w-full"
			v-if="!ghostStore.loading"
		>
			<!-- Filter -->
			<section class="flex flex-row w-full gap-2 sticky top-0 z-10 backdrop-blur mb-2">
				<Select
					multiple
					@update:model-value="ghostStore.filterEvidences($event as string[])"
				>
					<SelectTrigger class="max-w-1/3 w-1/3 bg-stone-900 border-0 text-amber-50 focus-visible:ring-0" >
						<SelectValue :placeholder="`${t('GenericActions.select_evidence')}...`" />
					</SelectTrigger>
					<SelectContent class="bg-stone-900 border-0 text-amber-50">
						<SelectGroup>
							<SelectItem
								v-for="evidence in ghostStore.evidences"
								class="focus:bg-stone-800 focus:text-amber-50"
								:key="evidence.name"
								:value="evidence.name"
							>
								{{ evidence.name }}
							</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
				<div class="relative w-full items-center">
					<Input
						type="text"
						class="bg-stone-900 border-0 text-amber-50 focus-visible:ring-0 pl-10"
						:placeholder="`${t('GenericActions.search')}...`"
						@update:model-value="ghostStore.filterSearch($event.toString())"
					/>
					<span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
						<Search class="size-6 text-muted-foreground" />
					</span>
				</div>
			</section>		 
			<!-- Ghosts -->
			<div class="grid grid-cols-2 gap-3 auto-rows-min">
				<section
					v-for="ghost in ghostStore.filteredGhosts"
					:key="ghost.name"
					class="flex flex-col gap-2 p-3 rounded-lg bg-[#1F1F1F] border border-stone-800 shadow-sm cursor-pointer hover:bg-[#2A2A2A] transition"
					@click="ghostStore.getGhostById(ghost.id)"
				>
					<!-- Name -->
					<div class="flex justify-between items-center">
						<h1 class="text-lg font-semibold text-amber-50">{{ ghost.name }}</h1>
					</div>
					<!-- Evidence -->
					<div class="flex flex-wrap gap-1">
						<p v-for="evidence in ghost.evidences" class="px-2 py-0.5 text-xs bg-stone-700 rounded text-stone-300">
							{{ evidence.name }}
						</p>
					</div>
					<!-- Sanity -->
					<div class="flex items-center gap-1 text-xs">
						<Brain class="text-red-400" :size="18" />
						<div class="flex gap-1 text-stone-300 text-sm">
							<p v-if="ghost.sanity.min != 0" class="px-1 rounded bg-green-900">{{ ghost.sanity.min }}%</p>
							<p class="px-1 rounded bg-stone-700" >{{ ghost.sanity.normal }}%</p>
							<p v-if="ghost.sanity.max != 0" class="px-1 rounded bg-red-900">{{ ghost.sanity.max }}%</p>
						</div>
					</div>
					<!-- Speed -->
					<div class="flex items-center gap-1 text-xs">
						<Footprints :size="18" class="text-amber-50" />
						<div class="flex gap-1 text-stone-300 text-sm">
							<p v-if="ghost.speed.min != 0" class="px-1 rounded bg-stone-700">{{ ghost.speed.min }}m/s</p>
							<p class="px-1 rounded bg-stone-700">{{ ghost.speed.normal }}m/s</p>
							<p v-if="ghost.speed.max != 0" class="px-1 rounded bg-stone-700">{{ ghost.speed.max }}m/s</p>
						</div>
					</div>
				</section>
			</div>
		</div>
		<LoadingComponent v-if="ghostStore.loading" />	
	</div>
</template>

<script setup lang="ts">
import { useGhostStore } from '@/stores/ghostStore';
import { Brain, Footprints, Search } from 'lucide-vue-next';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input';
import { useI18n } from 'vue-i18n';
import { onMounted } from 'vue';
import LoadingComponent from '@/components/LoadingComponent.vue';

const { t } = useI18n();
const ghostStore = useGhostStore();

onMounted(async () => {
	await ghostStore.initStore();
})

</script>
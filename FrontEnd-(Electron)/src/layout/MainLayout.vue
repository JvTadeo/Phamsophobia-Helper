<template>
	<div class="h-full w-full flex px-6 justify-evenly flex-col drag">
		<!-- Actions Buttons and Language Selector -->
		<div class="flex flex-row gap-4 w-full justify-between">
			<div class="no-drag flex flex-row">
				<LanguageSelector
				/>
			</div>
			<!-- Actions -->
			<section class="flex flex-row no-drag gap-4">
				<!-- Minimize -->
				<span
					class="cursor-pointer px-4 text-amber-50 bg-gradient-to-t from-stone-600 from-[60%] to-transparent to-[60%]"
					@click="useHomeStore().minimizeWindow()">
					_
				</span>
				<!-- Close -->
				<span
					class="cursor-pointer px-4 text-amber-50 bg-gradient-to-t from-red-500 from-[60%] to-transparent to-[60%]"
					@click="useHomeStore().closeWindow()">
					X
				</span>
			</section>
		</div>
		<!-- View -->
		<div class="flex flex-col h-[90vh] w-full bg-[#404040] rounded-2xl p-4 space-y-4 inner-shadow-custom no-drag">
			<div class="flex flex-col space-y-2">
				<HeaderCustom />
				<Separator />
				<ToolBox />
				<Separator />
			</div>
			<!-- Body -->
			<router-view class="h-full w-full overflow-auto"/>
		</div>
	</div>
</template>

<script setup lang="ts">
import LanguageSelector from '@/components/LanguageSelector.vue';
import HeaderCustom from '@/components/HeaderCustom.vue';
import ToolBox from '@/components/Navbar.vue';
import { useHomeStore } from '@/stores/homeStore';
import { Separator } from '@/components/ui/separator';
</script>
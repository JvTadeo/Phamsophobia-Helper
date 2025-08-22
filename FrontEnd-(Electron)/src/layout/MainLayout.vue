<template>
	<div class="h-full w-full flex px-6 justify-evenly flex-col drag">
		<!-- Actions Buttons -->
		<div class="self-end flex flex-row gap-4 no-drag">
			<span
				class="cursor-pointer px-4 text-amber-50 bg-gradient-to-t from-stone-600 from-[60%] to-transparent to-[60%]"
				@click="useHomeStore().minimizeWindow()">
				_
			</span>
			<span
				class="cursor-pointer px-4 text-amber-50 bg-gradient-to-t from-red-500 from-[60%] to-transparent to-[60%]"
				@click="useHomeStore().closeWindow()">
				X
			</span>
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
import HeaderCustom from '@/components/HeaderCustom.vue';
import ToolBox from '@/components/ToolBox.vue';
import { useHomeStore } from '@/stores/homeStore';
import { Separator } from '@/components/ui/separator';
</script>

<style scoped>
.inner-shadow-custom {
	box-shadow: rgb(34, 34, 34) 0px 0px 66px -12px inset, rgb(34, 34, 34) 0px 18px 36px -18px inset;
}
</style>
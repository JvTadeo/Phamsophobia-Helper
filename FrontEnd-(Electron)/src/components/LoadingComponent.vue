<template>
	<div class="relative top-0 right-0 w-full h-full flex justify-center items-center gap-3 text-stone-100">
		<Ghost :size="34" class="ghost-animation z-20" />
		<p class="z-20 loading-text text-2xl relative">{{ t('GenericActions.loading') }}</p>
	</div>
</template>

<script setup lang="ts">
import { Ghost } from 'lucide-vue-next';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>

<style scoped>
.ghost-animation {
	animation: bounce 2s infinite;
}

.loading-text::after {
	position: absolute;
	left: 100%;
	content: '';
	animation: dots 4s infinite;
}

@keyframes bounce {

	0%,
	100% {
		transform: translateY(5px);
	}

	50% {
		transform: translateY(-5px);
	}
}

@keyframes dots {
	0% {
		content: '';
	}

	25% {
		content: '.';
	}

	50% {
		content: '..';
	}

	75% {
		content: '...';
	}

	100% {
		content: '';
	}
}
</style>
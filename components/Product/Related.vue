<script setup lang="ts">
	import type { IProduct } from '~/types/product';
	defineProps<{ product: IProduct; }>();
</script>

<template>
	<div class="container mx-auto px-5 pb-5 pt-10 lg:pt-24 border-t border-neutralBlue-100">
		<h2 class="font-saira text-h3-normal font-medium text-neutralBlue-950 uppercase text-center lg:pb-12 pb-5">
			Povezani proizvodi
		</h2>

		<Carousel :products="product.related_products" />
	</div>
</template> 
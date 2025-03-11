<script setup lang="ts">
	import type { IProduct } from '~/types/product';
	const config = useRuntimeConfig();

	definePageMeta({
		layout: 'products'
	})

	const products = ref<IProduct[]>([]);
	const loading = ref(false);

	const fetchData = async () => {
		loading.value = true;

		try {
			const { data: productData } = await useFetch(`${config.public.url}/products`);

			// @ts-ignore
			products.value = productData.value.data || [];
		
		} catch (error) {
		loading.value = false;
			console.error('Došlo je do greške pri učitavanju proizvoda:', error);
		} finally {
			loading.value = false;
		}
	};

	onMounted(() => {
		fetchData();
	});

	const sortOptions = [
		{ value: 'new', label: 'Poredaj po najnovijem' },
		{ value: 'popular', label: 'Poredaj po popularnosti' },
		{ value: 'asc', label: 'Poredaj po cijeni: od najniže do najviše' },
		{ value: 'desc', label: 'Poredaj po cijeni: od najviše do najniže' }
	]

	const selectedSort = ref(sortOptions[0].value)

	useHead({  //adding custom page meta (first way)
		title: 'NK Rijeka | Products',
		meta:[
			{name:'description', content: 'All products'}
		],
	})
</script>

<template>
	<div v-if="products.length > 0">
		<div class="flex flex-col items-start justify-between gap-4 pb-12 border-t border-gray-200 sm:gap-0 sm:flex-row sm:items-center pt-9">
			<p class="font-normal font-roboto text-body2 text-neutralBlue-950">Prikazujemo {{ products?.length || 0 }} proizvoda</p>

			<USelect 
				v-model="selectedSort"
				:options="sortOptions"
				:ui="{ 
					color: { 
						white: { 
							outline: 'shadow-none dark:shadow-none dark:text-gray-900 text-gray-900 dark:bg-white bg-white dark:focus:ring-blue-500 focus:ring-blue-500 dark:ring-neutralBlue-200 ring-neutralBlue-200 font-roboto font-normal text-body3' 
						} 
					},
					icon: {
						base: 'text-neutralBlue-600 dark:text-neutralBlue-600'
					} 
				}" 
			/> 
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10">
			<div v-for="p in products" :key="p.id">
				<ProductCard  :product="p"/>
			</div>
		</div>
	</div>
</template>


<style scoped>

</style>

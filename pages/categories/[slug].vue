<script setup lang="ts">
	import { type IProduct } from '@/types/product';

	definePageMeta({
		layout: 'products'
	})

	const { slug } = useRoute().params;

	const { data: products, status, error, refresh, clear } = await useFetch<IProduct>(`https://fakestoreapi.com/products/category/${slug}`)
</script>

<template>
	<div>
		<NuxtLink to="/categories" class="text-blue-500 underline">
			Nazad na kategorije
		</NuxtLink>
		<h1 class="py-10 text-2xl font-bold">Proizvodi u kategoriji: {{ slug }}</h1>

		<div v-if="status == 'success' && products" class="grid grid-cols-3 gap-5">
			<ProductCard v-for="(product, index) in products" :key="index" :product="product" />
		</div>
		<p v-else>Trenutno nema proizvoda u ovoj kategoriji.</p>
	</div>
</template>
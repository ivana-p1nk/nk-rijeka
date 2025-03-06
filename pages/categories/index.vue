<!-- pages/categories.vue -->
<template>
	<div>
		<h1 class="font-semibold text-black">Kategorije</h1>
		<ul class="text-blue-400 underline">
			<li v-for="category in categories" :key="category.id">
				<NuxtLink :to="`/categories/${encodeURIComponent(category.slug)}`">{{ category.title }}</NuxtLink>

				<ul v-if="category.sub_categories && category.sub_categories.length">
					<li v-for="subcategory in category.sub_categories" :key="subcategory.id" class="ml-4">
					<!-- Link to subcategory page -->
					<NuxtLink :to="`/categories/${encodeURIComponent(category.slug)}/${encodeURIComponent(subcategory.slug)}`">
						{{ subcategory.title }}
					</NuxtLink>
					</li>
				</ul>

			</li>
		</ul>
	</div>
</template>

<script setup>
	definePageMeta({
		layout: 'products'
	})

	const { data: categories, error } = await useFetch('https://nkrijeka-app.laravel.cloud/api/v1/categories');

	if (error.value) {
		console.error('Došlo je do pogreške prilikom dohvaćanja kategorija:', error.value)
	}
</script>
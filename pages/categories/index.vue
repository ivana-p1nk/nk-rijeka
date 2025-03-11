<script setup lang="ts">
	import type { ICategory } from '~/types/category';
	const config = useRuntimeConfig();

	const loading = ref(true);
    const categories = ref<ICategory[]>();

	const fetchCategories = async () => {
        loading.value = true;

        try {
            const { data: categoryData } = await useFetch(`${config.public.url}/categories`);
            // @ts-ignore
            categories.value = categoryData.value;
            loading.value = false;
        } catch (error) {
            console.error(error);
            loading.value = false;
        }
    }

    onMounted(fetchCategories);
</script>

<template>
	<div class="container px-20 pt-40 mx-auto">
		<h1 class="font-semibold text-black">Kategorije</h1>
		<ul class="text-blue-400 underline">
			<li v-for="category in categories" :key="category.id">
				<NuxtLink :to="`/categories/${encodeURIComponent(category.slug!)}`">{{ category.title }}</NuxtLink>
				<ul v-if="category.sub_categories && category.sub_categories.length">
					<li v-for="subcategory in category.sub_categories" :key="subcategory.id" class="ml-4">
						<NuxtLink :to="`/categories/${encodeURIComponent(category.slug!)}/${encodeURIComponent(subcategory.slug!)}`">
							{{ subcategory.title }}
						</NuxtLink>
					</li>
				</ul>
			</li>
		</ul>
	</div>
</template>
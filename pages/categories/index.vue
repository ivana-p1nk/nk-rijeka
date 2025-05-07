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
	<div class="bg-igraci">
		<div class="container mx-auto con-height pb-5 px-5">
			<p class="font-normal text-blue-900 font-roboto text-body2 ">
				<NuxtLink class="text-blue-400 link-color" to="/">Početna / </NuxtLink>
				<span>Kategorije</span>
			</p>

			<p
				class="pt-1 pb-8 text-h1-normal font-medium uppercase text-blue-900 font-saira border-b border-1 border-gray-200">
				SVE KATEGORIJE
			</p>

			<ul class="text-blue-400 underline pt-10">
				<li v-for="category in categories" :key="category.id">
					<NuxtLink :to="`/categories/${encodeURIComponent(category.slug!)}`">
						{{ category.title }} ({{ category.total_products_count }})
					</NuxtLink>
					<ul v-if="category.sub_categories && category.sub_categories.length">
						<li v-for="subcategory in category.sub_categories" :key="subcategory.id" class="ml-4">
							<NuxtLink
								:to="`/categories/${encodeURIComponent(category.slug!)}/${encodeURIComponent(subcategory.slug!)}`">
								{{ subcategory.title }}
							</NuxtLink>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</div>

</template>
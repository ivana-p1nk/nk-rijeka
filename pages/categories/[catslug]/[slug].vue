<script setup lang="ts">
	import { type ICategory } from '@/types/category';
    import type { IProduct } from '~/types/product';
	
	const config = useRuntimeConfig();
	const route = useRoute()
	const { catslug, slug } = route.params;

	import { useRoute } from 'vue-router';

	const loadingCat = ref(true);
    const category = ref<ICategory>();

    const products = ref<IProduct[]>([]);
    const loadingProduct = ref(false);
    const isFetching = ref(false);

    const page = ref(1);
	const totalProducts = ref(0);
	const perPage = 12;
	const allLoaded = ref(false);

    const categoriy = ref<number[]>([]);

    const sort = ref("Najnoviji");

	const fetchData = async () => {
        if(!category.value) {
            loadingCat.value = true;
    
            try {
                const { data: categoryData } = await useFetch(`${config.public.url}/categories/${slug}`);
                // @ts-ignore
                category.value = categoryData.value[0];
            } catch (error) {
                console.error('Došlo je do greške pri učitavanju kategorija:', error);
            } finally {
                loadingCat.value = false;
            }
        }
        
		if (loadingProduct.value || allLoaded.value || isFetching.value) return;

		isFetching.value = true;
		loadingProduct.value = true;

        if(!loadingCat.value && category.value && category.value.sub_categories) {
            const catIds = category.value.id;
    
            try {
                const { data: productData } = await useFetch(`${config.public.url}/products`, {
                    params: {
                        categories: categoriy.value.length > 0 ? categoriy.value : (catIds != 0 ? catIds : category.value.id),
                        sort: sort.value,
                        page: page.value,
                        perPage,
                    },
                });
    
                // @ts-ignore
                const newProducts = productData.value.data || [];
                products.value = [...products.value, ...newProducts];
    
                // @ts-ignore
                totalProducts.value = productData.value.total;
    
                if (products.value.length >= totalProducts.value) {
                    allLoaded.value = true;
                }
            } catch (error) {
                console.error('Došlo je do greške pri učitavanju proizvoda:', error);
            } finally {
                isFetching.value = false;
                loadingProduct.value = false;
            }
        }
	};

	onMounted(() => {
        fetchData();
    });

    watch([categoriy, sort], () => {
		products.value = [];
		page.value = 1;
		allLoaded.value = false;
		fetchData();
	}, { deep: true });
</script>

<template>
	<div class="container px-20 pt-40 mx-auto" v-if="!loadingCat && category">
		<NuxtLink :to="`/categories/${catslug}`" class="text-blue-500 underline">
			Nazad na kategorije
		</NuxtLink>

        <p class="py-10 text-2xl font-bold">{{ category.title }}</p>

		<div v-if="category.sub_categories" class="space-y-2 columns-1 md:columns-2">
            <div v-for="(item, index) in category.sub_categories" :key="index">
                <NuxtLink :to="`/categories/${category.slug!}/${item.slug!}`" class="text-black transition duration-500 ease-in-out cursor-pointer hover:text-blue-400">
                    {{ item.title }} ({{ item.products_count }})
                </NuxtLink>
            </div>
        </div>

        <div class="col-span-1 pt-10 products md:col-span-4">
            <div class="grid grid-cols-2 gap-2 md:grid-cols-3 xl:grid-cols-4">
                <ProductCard v-for="(product, index) in products" :key="index" :product="product" class="w-full" />
            </div>
        </div>
	</div>
</template>

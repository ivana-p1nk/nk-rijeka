<script setup lang="ts">
	import { type ICategory } from '@/types/category';
    import type { IProduct } from '~/types/product';
	
	const route = useRoute();
	const config = useRuntimeConfig();
	const { catslug } = route.params;

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
                const { data: categoryData } = await useFetch(`${config.public.url}/categories/${catslug}`);
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
            const catIds = category.value.sub_categories.map(subCategory => subCategory.id);
    
            try {
                const { data: productData } = await useFetch(`${config.public.url}/products`, {
                    params: {
                        categories: categoriy.value.length > 0 ? categoriy.value : (catIds.length != 0 ? catIds.join(",") : category.value.id),
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



       /*za filtere*/
       const activeFilters = ref<Record<string, string>>({});

        const filteredProducts = computed(() => {
        return products.value.filter(product => {
        const packagingFilter = activeFilters.value.size;
        if (packagingFilter) {
        return product.variations?.some(v => v.packaging === packagingFilter);
        }
        return true; // ako nema filtera, prikaži sve
        });
        });

</script>

<template>   
    <div class="bg-igraci">
        <div class="container mx-auto pt-52 pb-5 px-5">
            <div v-if="!loadingCat && category">
                <p class="font-normal text-blue-900 font-roboto text-body2">
                    <NuxtLink class="text-blue-400 link-color" to="/"> Početna / </NuxtLink>
                    <span>Breadcrumbs</span>
                </p>
                <p class="pb-8 text-h1-normal font-medium uppercase text-blue-900 font-saira">{{ category.title }}</p>
                <div>
                    <div v-if="category.sub_categories" class="flex flex-row flex-wrap gap-2">
                        <div v-for="(item, index) in category.sub_categories" :key="index">
                            <NuxtLink :to="`/categories/${category.slug!}/${item.slug!}`" 
                            class="btn-secondary uppercase small px-5">
                                {{ item.title }}
                            </NuxtLink>
                        </div>
                    </div>
                    <!-- FILTRACIJA -->
                    <FilterAtributeFilter :products="products" v-model:filters="activeFilters"/>
                </div>

                <div class="col-span-1 pt-10 products md:col-span-4">
                    <div class="grid grid-cols-2 gap-2 md:grid-cols-3 xl:grid-cols-4">
                        <ProductCard v-for="(product, index) in filteredProducts"
  :key="index"
  :product="product" class="w-full" />
                    </div>
                </div>
            </div>
	    </div>
    </div>
</template>




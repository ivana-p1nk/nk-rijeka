<script setup lang="ts">
import { type ICategory } from '@/types/category';
import { type IProduct } from '@/types/product';

const config = useRuntimeConfig();
const route = useRoute();
const { catslug, slug } = route.params;

const loadingCat = ref(true);
const loadingParentCat = ref(true);

const category = ref<ICategory>();
const parentCategory = ref<ICategory>();

const products = ref<IProduct[]>([]);
const loadingProduct = ref(false);
const isFetching = ref(false);

const page = ref(1);
const totalProducts = ref(0);
const perPage = 12;
const allLoaded = ref(false);

const categoriy = ref<number[]>([]);
const sort = ref('Najnoviji');

const activeFilters = ref<Record<string, string>>({});

const filteredProducts = computed(() => {
  return products.value.filter(product => {
    const { size, price } = activeFilters.value;

    if (size && !product.variations?.some(v => v.packaging === size)) {
      return false;
    }

    if (price && product.price !== undefined && product.price !== null) {
      if (price === '200€+') {
        if (product.price < 200) return false;
      } else {
        const [minStr, maxStr] = price.split('-');
        const min = parseFloat(minStr);
        const max = parseFloat(maxStr);
        if (!(product.price >= min && product.price < max)) {
          return false;
        }
      }
    }

    return true;
  });
});

const fetchCategoryData = async () => {
  loadingCat.value = true;
  try {
    const { data: categoryData } = await useFetch(`${config.public.url}/categories/${slug}`);
    // @ts-ignore
    category.value = categoryData.value[0];
  } catch (error) {
    console.error('Greška pri učitavanju kategorije:', error);
  } finally {
    loadingCat.value = false;
  }
};

const fetchParentCategoryData = async () => {
  loadingParentCat.value = true;
  try {
    const { data: parentData } = await useFetch(`${config.public.url}/categories/${catslug}`);
    // @ts-ignore
    parentCategory.value = parentData.value[0];
  } catch (error) {
    console.error('Greška pri učitavanju glavne kategorije:', error);
  } finally {
    loadingParentCat.value = false;
  }
};

const fetchProducts = async () => {
  if (loadingProduct.value || allLoaded.value || isFetching.value) return;

  isFetching.value = true;
  loadingProduct.value = true;

  if (!loadingCat.value && category.value) {
    const catId = category.value.id;

    try {
      const { data: productData } = await useFetch(`${config.public.url}/products`, {
        params: {
          categories: categoriy.value.length > 0 ? categoriy.value : catId,
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
      console.error('Greška pri učitavanju proizvoda:', error);
    } finally {
      isFetching.value = false;
      loadingProduct.value = false;
    }
  }
};

const fetchAll = async () => {
  await Promise.all([fetchCategoryData(), fetchParentCategoryData()]);
  fetchProducts();
};

onMounted(() => {
  fetchAll();
});

watch([categoriy, sort], () => {
  products.value = [];
  page.value = 1;
  allLoaded.value = false;
  fetchProducts();
}, { deep: true });

</script>

<template>
  <div class="bg-igraci">
    <div class="container mx-auto pt-52 pb-5 px-5" v-if="!loadingCat && !loadingParentCat && category && parentCategory">
      <!-- Breadcrumb -->
      <div class="pb-16 mb-8 border-b border-1 border-gray-200">
        <p class="font-normal text-blue-900 font-roboto text-body2">
          <NuxtLink class="text-blue-400 link-color" to="/">Početna / </NuxtLink>
          <NuxtLink class="text-blue-400 link-color" :to="`/categories/${catslug}`">
            {{ parentCategory.title }} /
          </NuxtLink>
          <span>{{ category.title }}</span>
        </p>

        <p class="pb-8 text-h1-normal font-medium uppercase text-blue-900 font-saira">
          {{ category.title }}
        </p>

        <!-- Subcategories -->
        <div class="flex flex-col lg:flex-row flex-wrap gap-5 md:gap-3">
          <div class="w-full lg:w-auto flex flex-wrap gap-2">
            <div v-if="parentCategory.sub_categories" class="flex flex-wrap gap-2">
              <div v-for="(item, index) in parentCategory.sub_categories" :key="index">
                <NuxtLink
                  :to="`/categories/${catslug}/${item.slug!}`"
                  :class="[
                    'btn-secondary uppercase small px-5 inline-block',
                    { 'active': slug === item.slug }
                ]"    
                >
                  {{ item.title }}
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- Filters -->
          <div class="w-full lg:flex-1 flex flex-col sm:flex-row flex-wrap gap-2 justify-start lg:justify-end items-start">
            <FilterAtributeFilter :products="products" v-model:filters="activeFilters" />
          </div>
        </div>
      </div>

      <!-- Products -->
      <div class="col-span-1 products md:col-span-4">
        <p class="text-body2 text-neutralBlue-950">Prikazujemo {{ filteredProducts.length }} proizvoda</p>
        <div v-if="filteredProducts.length > 0" class="grid grid-cols-2 gap-2 md:grid-cols-3 xl:grid-cols-4 pt-8">
          <ProductCard v-for="(product, index) in filteredProducts" :key="index" :product="product" class="w-full" />
        </div>
        <div v-else class="pb-12 text-body2 text-neutralBlue-950">
          Nažalost, trenutno nema dostupnih proizvoda u ovoj kategoriji.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCategoryProducts } from '@/composables/useCategoryProducts';

const { catslug, slug } = useRoute().params;
const {
  category,
  parentCategory,
  products,
  filteredProducts,
  activeFilters,
  loadingCat,
  loadingParentCat,
  fetchAll
} = useCategoryProducts(catslug, slug);

onMounted(fetchAll);
</script>

<template>
  <div class="bg-igraci">
    <div
      class="container mx-auto pt-52 pb-5 px-5"
      v-if="!loadingCat && !loadingParentCat && category && parentCategory"
    >
      <CategoryPage
        :category="category"
        :parent-category="parentCategory"
        :products="products"
        :filtered-products="filteredProducts"
        :active-filters="activeFilters"
      />
    </div>
  </div>
</template>

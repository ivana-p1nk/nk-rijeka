<script setup lang="ts">
import { useCategoryProducts } from '@/composables/useCategoryProducts';

const { catslug } = useRoute().params;

const {
  category,
  products,
  filteredProducts,
  activeFilters,
  loadingCat,
  fetchAll,
} = useCategoryProducts(catslug);

onMounted(fetchAll);
</script>

<template>
  <div class="bg-igraci">
    <div class="container mx-auto pt-52 pb-5 px-5" v-if="!loadingCat && category">
      <CategoryPage
        :category="category"
        :products="products"
        :filtered-products="filteredProducts"
        :active-filters="activeFilters"
        @update:activeFilters="activeFilters = $event"
      />
    </div>
  </div>
</template>
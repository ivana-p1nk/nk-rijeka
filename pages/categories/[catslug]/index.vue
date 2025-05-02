<script setup lang="ts">
import { useCategoryProducts } from '@/composables/useCategoryProducts';
import { useRoute, createError } from '#imports'

const route = useRoute()
const catslug = route.params.catslug as string

const {
  category,
  products,
  filteredProducts,
  activeFilters,
  loadingCat,
  fetchAll,
  sort,
} = useCategoryProducts(catslug);

await fetchAll()

if (!category.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Kategorija nije pronađena',
  })
}
</script>

<template>
  <div class="bg-igraci">
    <div class="container mx-auto pt-52 pb-5 px-5" v-if="!loadingCat && category">
      <CategoryPage
        :category="category"
        :products="products"
        :filtered-products="filteredProducts"
        :active-filters="activeFilters"
        :sort="sort"
        @update:activeFilters="activeFilters = $event"
        @update:sort="sort = $event"
      />
    </div>
  </div>
</template>
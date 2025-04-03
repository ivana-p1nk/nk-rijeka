<script setup lang="ts">
    import type { IProduct } from '~/types/product';
    defineProps<{ product: IProduct; }>();
</script>

<template>
    <div class="py-10 related-products">
      <h2 class="mb-6 text-2xl font-semibold text-gray-800">Related Products</h2>
      <ul class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <li
          v-for="related in product.related_products"
          :key="related.id"
        >
          <ProductCard :product="related" />
        </li>
      </ul>
    </div>
  </template>
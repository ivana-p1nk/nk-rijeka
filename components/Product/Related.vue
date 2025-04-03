<script setup lang="ts">
    import type { IProduct } from '~/types/product';
    defineProps<{ product: IProduct; }>();
</script>

<template>
    <div class="py-10 related-products">
      <h2 class="mb-6 text-2xl font-semibold text-gray-800">Related Products</h2>
      <UCarousel 
        v-slot="{ item }" 
        :items="product.related_products"
        :ui="{ item: 'basis-1/4' }"
      >
        <ProductCard :product="item" />
      </UCarousel>
    </div>
  </template>
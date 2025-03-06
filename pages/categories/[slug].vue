<script setup lang="ts">
  import { definePageMeta } from '#imports';
  import { type IProduct } from '@/types/product';
  import { useRoute } from 'vue-router'; 

  definePageMeta({
    layout: 'products',
  });

  const route = useRoute();
  const slug = route.params.slug as string; 

  // Fetch products based on the slug using useFetch
  const { data: products, error, status } = await useFetch<IProduct[]>(
    `https://fakestoreapi.com/products/category/${slug}`
  );
</script>

<template>
  <div>
    <NuxtLink to="/categories" class="text-blue-500 underline">
      Nazad na kategorije
    </NuxtLink>

    <h1 class="py-10 text-2xl font-bold">Proizvodi u kategoriji: {{ slug }}</h1>

    <div v-if="status === 'success' && products?.length" class="grid grid-cols-3 gap-5">
      <ProductCard v-for="(product, index) in products" :key="index" :product="product" />
    </div>

    <p v-else-if="status === 'success'">Trenutno nema proizvoda u ovoj kategoriji.</p>

    <p v-else>Došlo je do pogreške prilikom dohvaćanja proizvoda.</p>
  </div>
</template>

<!-- pages/categories.vue -->
<template>
  <div>
    <h1 class="text-black font-semibold">Kategorije</h1>
    <ul class="text-blue-400 underline">
      <li v-for="category in categories" :key="category">
        <NuxtLink :to="`/categories/${encodeURIComponent(category)}`">{{ category }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
definePageMeta({
        layout: 'products'
    })
const { data: categories, error } = await useFetch('https://fakestoreapi.com/products/categories')
if (error.value) {
  console.error('Došlo je do pogreške prilikom dohvaćanja kategorija:', error.value)
}
</script>


<!-- pages/categories/[category].vue -->
<template>
  <div>
    <h1>Proizvodi u kategoriji: {{ category }}</h1>
    <div v-if="products.length > 0">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
    <p v-else>Trenutno nema proizvoda u ovoj kategoriji.</p>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'products'
})

const route = useRoute()
const category = decodeURIComponent(route.params.category)

const { data: products, error } = await useFetch(`https://fakestoreapi.com/products/category/${category}`)
if (error.value) {
  console.error('Došlo je do pogreške prilikom dohvaćanja proizvoda:', error.value)
}
</script>

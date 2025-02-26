<template>
    <div>
      <p>https://fakestoreapi.com/</p><br>
      <p class="text-lg font-semibold">Prikazujemo {{ products?.length || 0 }} proizvoda</p>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

          <div v-for="p in products" :key="p.id">
           <ProductCard  :product="p"/>
          </div>
        </div>
        <br> 
    </div>
  </template>
  
  <script setup>
   definePageMeta({
        layout: 'products'
    })

    // fetch products
    const { data: products } = await useFetch('https://fakestoreapi.com/products')

    useHead({  //adding custom page meta (first way)
      title: 'NK Rijeka | Products',
      meta:[
        {name:'description', content: 'All products'}
      ],
    })




  </script>
  
  <style scoped>
  
  </style>
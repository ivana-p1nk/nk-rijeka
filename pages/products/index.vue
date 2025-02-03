<template>
    <div>
      <p>https://fakestoreapi.com/</p><br>
        <div class="grid grid-cols-4 gap-5">
          <div v-for="p in products">
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
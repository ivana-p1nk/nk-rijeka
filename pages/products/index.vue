<template>
    <div>
      <p>https://fakestoreapi.com/</p><br>


<p>Početna / {{ products?.category}}</p>
             

<div class="flex flex-col gap-4 sm:gap-0 sm:flex-row justify-between items-start sm:items-center pt-9 pb-12 border-t border-gray-200">
        <p class="font-roboto font-normal text-body2 text-neutralBlue-950">Prikazujemo {{ products?.length || 0 }} proizvoda</p>
    
        <USelect 
          v-model="selectedSort"
          :options="sortOptions"
          :ui="{ 
            color: { 
              white: { 
                outline: 'shadow-none dark:shadow-none dark:text-gray-900 text-gray-900 dark:bg-white bg-white dark:focus:ring-blue-500 focus:ring-blue-500 dark:ring-neutralBlue-200 ring-neutralBlue-200 font-roboto font-normal text-body3' 
              } 
            },
            icon: {
              base: 'text-neutralBlue-600 dark:text-neutralBlue-600'
            } 
          }" 
        /> 
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10">

          <div v-for="p in products" :key="p.id">
           <ProductCard  :product="p"/>
          </div>
        </div>
        <br> 
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
   definePageMeta({
        layout: 'products'
    })

    // fetch products
    const { data: products } = await useFetch('https://fakestoreapi.com/products')


    const sortOptions = [
      { value: 'new', label: 'Poredaj po najnovijem' },
      { value: 'popular', label: 'Poredaj po popularnosti' },
      { value: 'asc', label: 'Poredaj po cijeni: od najniže do najviše' },
      { value: 'desc', label: 'Poredaj po cijeni: od najviše do najniže' }
    ]

    const selectedSort = ref(sortOptions[0].value)



    useHead({  //adding custom page meta (first way)
      title: 'NK Rijeka | Products',
      meta:[
        {name:'description', content: 'All products'}
      ],
    })

  </script>
  

  <style scoped>

</style>

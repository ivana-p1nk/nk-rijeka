<script setup lang="ts">
import type { IProduct } from '~/types/product'

const route = useRoute()
const config = useRuntimeConfig()

const searchTerm = computed(() => route.query.q?.toString() || '')
const products = ref<IProduct[]>([])
const loading = ref(false)

const fetchResults = async () => {
  if (!searchTerm.value) return

  loading.value = true

  try {
    const { data } = await useFetch<{ data: IProduct[] }>(`${config.public.url}/search`, {
      method: 'POST',
      body: {
        search: searchTerm.value,
      },
    })

    products.value = data.value?.data || []
  } catch (err) {
    console.error('Greška pri pretrazi:', err)
    products.value = []
  } finally {
    loading.value = false
  }
}

onMounted(fetchResults)

watch(() => route.query.q, fetchResults)

useHead({
  title: `Rezultati za: ${searchTerm.value}`,
})
</script>

<template>
    <div class="bg-igraci">
      <div class="container mx-auto con-height pb-5 px-5">
 
    <p class="text-blue-900 font-roboto text-body2 mb-1">
      <NuxtLink class="text-blue-400" to="/">Početna</NuxtLink> / Pretraga
    </p>
    <h1 class="text-h1-normal font-medium text-blue-900 font-saira mb-6">
      Pretraživali ste: {{ searchTerm }}
    </h1>

    <div v-if="loading">Učitavanje rezultata...</div>
    <div v-else-if="products.length === 0" class="text-neutral-600">Nema rezultata za "{{ searchTerm }}"</div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
  </div>
</div>
</template>
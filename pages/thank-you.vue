<script setup lang="ts">
import type { IProduct } from '~/types/product'
const config = useRuntimeConfig()

const products = ref<IProduct[]>([])
const loading = ref(false)

const fetchData = async () => {
    loading.value = true

    try {
        const { data: productData } = await useFetch(`${config.public.url}/products`)

        // @ts-ignore
        products.value = productData.value.data || []
    } catch (error) {
        loading.value = false
        console.error('Došlo je do greške pri učitavanju proizvoda:', error)
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    fetchData()
})
</script>

<template>
    <div class="flex flex-col items-center justify-center pt-40">
        <h1 class="font-medium text-blue-900 font-saira text-h1-normal">Zahvaljujemo!</h1>
        <p class="font-normal text-gray-900 font-roboto text-body1 py-7">
            Vaša narudžba je uspješno zaprimljena! Dobiti ćete potvrdu na vašu mail adresu.
        </p>
        <div class="flex flex-row justify-center gap-2">
            <NuxtLink to="/" class="uppercase btn-secondary medium">Naslovna</NuxtLink>
        </div>
    </div>

    <div class="container mx-auto px-5 pt-40">
        <div class="flex flex-col items-center gap-1 pb-10">
            <h1 class="font-bold text-blue-900 uppercase font-saira text-h2-normal">BESTSELLERI</h1>
            <p class="font-normal text-blue-900 font-roboto text-body1">
                Počasti se novim dresom, odabri atraktivan <br />poklon, ne propusti promotivne cijene...
            </p>
        </div>

        <Carousel :products="products" />
    </div>
</template>

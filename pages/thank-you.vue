<script setup lang="ts">
import type { IProduct } from '~/types/product'
const config = useRuntimeConfig()
import { useProductsByCategory } from '~/composables/useProductsByCategory'

const { products: bestsellerProducts, loading: loadingBestsellers } = useProductsByCategory(33)
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

const carouselNew = ref()

onMounted(() => {
    fetchData()

    setInterval(() => {
        if (!carouselNew.value) return
        if (carouselNew.value.page === carouselNew.value.pages) {
            return carouselNew.value.select(0)
        }
        carouselNew.value.next()
    }, 3000)
})
</script>

<template>
    <div class="flex flex-col items-center justify-center bg-goal con-height pb-20 px-5">
        <h1 class="font-medium text-blue-900 font-saira text-h1-normal">Zahvaljujemo!</h1>
        <p class="font-normal text-gray-900 font-roboto text-body1 py-7">
            Vaša narudžba je uspješno zaprimljena! Dobiti ćete potvrdu na vašu mail adresu.
        </p>
        <div class="flex flex-row justify-center gap-2">
            <NuxtLink to="/" class="uppercase btn-secondary medium">Naslovna</NuxtLink>
        </div>
    </div>

    <div class="container pt-10 md:pt-20 mx-auto border-t border-neutralBlue-100 px-5">
                <div class="flex flex-col md:flex-row justify-between gap-4">
                    <div class="flex flex-col gap-2 md:flex-row md:gap-9">
                        <div class="flex flex-row justify-between items-center">
                            <h1 class="font-bold text-blue-900 uppercase font-saira text-h2-normal">
                            BESTSELLERI
                            </h1>
                            <NuxtLink
                            to="/c/bestselleri"
                            class="uppercase btn-secondary xs h-fit md:hidden"
                            >
                            Pogledaj sve
                            </NuxtLink>
                        </div>
                        <p class="font-normal text-blue-900 font-roboto text-body1">
                            Počasti se novim dresom, odabri atraktivan <br>poklon, ne propusti promotivne cijene...
                        </p>
                    </div>
                    <NuxtLink
                        to="/c/bestselleri"
                        class="uppercase btn-secondary xs h-fit hidden md:block self-center"
                        >
                        Pogledaj sve
                    </NuxtLink>
                </div>

                <div v-if="loadingBestsellers" class="text-center text-gray-500">Učitavanje bestsellera...</div>
                <div v-if="bestsellerProducts.length > 0">
                    <Carousel :products="bestsellerProducts" class="pt-6" />
                </div>
                <div v-else class="text-center text-blue-900 font-roboto pt-12">
                    NEMA PROIZVODA U OVOJ KATEGORIJI
                </div>
            </div>
</template>

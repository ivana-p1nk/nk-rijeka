<script setup lang="ts">
import type { IProduct } from '~/types/product'
const config = useRuntimeConfig()
import ProductCard from '@/components/productCard.vue'
import { useFavoritesStore } from '~/composables/favorites'

const favoriteStore = useFavoritesStore()
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
    <div class="bg-igraci">
        <div class="container px-5 pb-12 mx-auto pt-52">
            <h1 class="pb-6 font-medium text-gray-900 font-saira text-h1-normal">Favoriti</h1>

            <div
                v-if="favoriteStore.favorite_products.length > 0"
                class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10 py-4 pb-10"
            >
                <div v-for="item in favoriteStore.favorite_products" :key="`${item.id}`">
                    <ProductCard :product="item" />
                </div>
            </div>

            <div v-else class="text-center py-10 text-blue-900 font-saira font-medium text-lg">
                Nijedan proizvod nije dodan na listu želja.
            </div>

            <div class="container pt-8 mx-auto border-t border-neutralBlue-100">
                <div class="flex flex-col items-center gap-1 pb-10">
                    <h1 class="font-bold text-blue-900 uppercase font-saira text-h2-normal">BESTSELLERI</h1>
                    <p class="font-normal text-blue-900 font-roboto text-body1">
                        Počasti se novim dresom, odabri atraktivan <br />poklon, ne propusti promotivne cijene...
                    </p>
                </div>

                <Carousel :products="products" class="pt-6" />
            </div>
        </div>
    </div>
</template>

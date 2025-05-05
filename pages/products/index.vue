<script setup lang="ts">
import type { IProduct } from '~/types/product'

const route = useRoute()
const config = useRuntimeConfig()

const products = ref<IProduct[]>([])
const loading = ref(false)

const perPage = 12
const page = ref(1)
const sort = ref('Najnoviji')

const total = ref(0)
const totalPages = computed(() => Math.ceil(total.value / perPage))

const fetchData = async () => {
    loading.value = true

    try {
        const { data: productData } = await useFetch(`${config.public.url}/products`, {
            params: {
                sort: sort.value,
                page: page.value,
                perPage,
            },
        })

        // @ts-ignore
        products.value = productData.value.data || []

        // @ts-ignore
        total.value = productData.value.total || 0
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

watch(
    [sort, () => route.query.search, page],
    ([newSort], [oldSort]) => {
        if (newSort !== oldSort) {
            page.value = 1
            return
        }

        fetchData()
    },
    { deep: true }
)

useHead({
    //adding custom page meta (first way)
    title: 'NK Rijeka | Products',
    meta: [{ name: 'description', content: 'All products' }],
})
</script>

<template>
    <div class="bg-igraci">
        <div class="container mx-auto con-height pb-5 px-5">
            <p class="pt-1 pb-8 text-h1-normal font-medium uppercase text-blue-900 font-saira">SVI PROIZVODI</p>
            <div v-if="products.length > 0">
                <div
                    class="flex flex-col items-start justify-between gap-4 pb-12 border-t border-gray-200 sm:gap-0 sm:flex-row sm:items-center pt-9"
                >
                    <p class="font-normal font-roboto text-body2 text-neutralBlue-950">
                        Prikazujemo {{ products?.length || 0 }} proizvoda
                    </p>

                    <USelect
                        v-model="sort"
                        :options="[
                            { value: 'Najnoviji', label: 'Poredaj po najnovijem' },
                            { value: 'popular', label: 'Poredaj po popularnosti' },
                            { value: 'S nižom cijenom', label: 'Poredaj po cijeni: od najniže do najviše' },
                            { value: 'S višom cijenom', label: 'Poredaj po cijeni: od najviše do najniže' },
                        ]"
                        :ui="{
                            color: {
                                white: {
                                    outline:
                                        'shadow-none dark:shadow-none dark:text-gray-900 text-gray-900 dark:bg-white bg-white dark:focus:ring-blue-500 focus:ring-blue-500 dark:ring-neutralBlue-200 ring-neutralBlue-200 font-roboto font-normal text-body3',
                                },
                            },
                            icon: {
                                base: 'text-neutralBlue-600 dark:text-neutralBlue-600',
                            },
                        }"
                    />
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10">
                    <div v-for="p in products" :key="p.id">
                        <ProductCard :product="p" />
                    </div>
                </div>
                <div class="flex justify-center mt-10 gap-4" v-if="totalPages > 1">
                    <button
                        @click="page--"
                        :disabled="page <= 1"
                        class="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Prethodna
                    </button>

                    <span class="px-4 py-2 text-neutralBlue-950 font-roboto">
                        Stranica {{ page }} od {{ totalPages }}
                    </span>

                    <button
                        @click="page++"
                        :disabled="page >= totalPages"
                        class="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Sljedeća
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>

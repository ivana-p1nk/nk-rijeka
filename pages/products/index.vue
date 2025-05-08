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
    async ([newSort, newSearch], [oldSort, oldSearch]) => {
        if (newSort !== oldSort || newSearch !== oldSearch) {
            if (page.value !== 1) {
                page.value = 1
            } else {
                await nextTick()
                fetchData()
            }
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
            <p class="font-normal text-blue-900 font-roboto text-body2 pb-1">
                <NuxtLink class="text-blue-400 link-color" to="/"> Početna / </NuxtLink>
                <span>Proizvodi</span>
            </p>
            <p class="pt-1 pb-8 text-h1-normal font-medium uppercase text-blue-900 font-saira">SVI PROIZVODI</p>
            <div v-if="products.length > 0">
                <div
                    class="flex flex-col items-start justify-between gap-4 pb-12 border-t border-gray-200 sm:gap-0 sm:flex-row sm:items-center pt-9"
                >
                
                    <p class="font-normal font-roboto text-body2 text-neutralBlue-950">
                        <!--Prikazujemo {{ products?.length || 0 }} proizvoda-->
                        Prikazujemo {{ total }} proizvoda
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

                <!-- PAGINACIJA -->
                <div class="flex justify-center mt-10 gap-1 pt-8 border-t border-neutralBlue-200" v-if="totalPages > 1">
                    <button
                      @click="page--"
                      :disabled="page <= 1"
                      class="px-3 py-3 bg-white rounded-lg  transition-colors duration-300 flex items-center shadow-sm
                            disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-gray-900
                            hover:bg-blue-800 hover:text-white"
                    >
                        <Icon name="material-symbols:chevron-left" class="transition-colors duration-300 text-current" />
                    </button>

                    <!--
                    <span class="px-4 py-2 text-neutralBlue-950 font-roboto bg-white rounded shadow-sm">
                        Stranica {{ page }} od {{ totalPages }}
                    </span>
                    -->

                    <div class="flex items-center gap-1">
                        <button
                          v-for="i in totalPages"
                          :key="i"
                          @click="page = i"
                          class="px-4 py-3 rounded-lg shadow-sm text-button3 font-bold transition-colors duration-300"
                          :class="page === i
                            ? 'bg-blue-800 text-white'
                            : 'bg-white text-gray-900 hover:bg-blue-800 hover:text-white'"
                          >
                          {{ i }}
                        </button>
                    </div>
                    
                    <button
                        @click="page++"
                        :disabled="page >= totalPages"
                        class="px-3 py-3 bg-white rounded-lg  transition-colors duration-300 flex items-center shadow-sm
                            disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-gray-900
                            hover:bg-blue-800 hover:text-white"
                    >
                        <Icon name="material-symbols:chevron-right" class="transition-colors duration-300 text-current" />
                    </button>
                </div>

            </div>
        </div>
    </div>
</template>

<style scoped></style>

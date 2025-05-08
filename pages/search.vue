<script setup lang="ts">
    import type { IProduct } from '~/types/product'

    const { api } = useAxios()
    const route = useRoute()

    const searchTerm = computed(() => route.query.q?.toString() || '')
    const products = ref<IProduct[]>([])
    const loading = ref(false)

    const page = ref(1);
	const totalProducts = ref(0);
	const perPage = 12;
    const totalPages = computed(() => Math.ceil(totalProducts.value / perPage))

    const fetchResults = async () => {
        if (!searchTerm.value) return

        loading.value = true

        try {
            api.post('/search', {
                'search': searchTerm.value
            }).then(({ data }) => {
                loading.value = false

                products.value = data.data || [];
                totalProducts.value = data.total || 0;
            }).catch((err) => {
                loading.value = false
                console.error('Greška pri pretrazi:', err)
                products.value = []
            });
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

            <div v-if="loading">
                Učitavanje rezultata...
            </div>
            <div v-else-if="products.length === 0" class="text-neutral-600">
                Nema rezultata za "{{ searchTerm }}"
            </div>
            <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                <ProductCard v-if="products" v-for="product in products" :key="product.id" :product="product" />

                <!-- PAGINACIJA -->
                <div
                    class="flex justify-center mt-10 gap-1 pt-8 border-t border-neutralBlue-200"
                    v-if="totalPages > 1"
                >
                    <button
                        @click="page--"
                        :disabled="page <= 1"
                        class="px-3 py-3 bg-white rounded-lg transition-colors duration-300 flex items-center shadow-sm disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-gray-900 hover:bg-blue-800 hover:text-white"
                    >
                        <Icon name="material-symbols:chevron-left" class="transition-colors duration-300 text-current" />
                    </button>

                    <div class="flex items-center gap-1">
                        <button
                            v-for="i in totalPages"
                            :key="i"
                            @click="page = i"
                            class="px-4 py-3 rounded-lg shadow-sm text-button3 font-bold transition-colors duration-300"
                            :class="page === i ? 'bg-blue-800 text-white' : 'bg-white text-gray-900 hover:bg-blue-800 hover:text-white'"
                        >
                            {{ i }}
                        </button>
                    </div>

                    <button
                        @click="page++"
                        :disabled="page >= totalPages"
                        class="px-3 py-3 bg-white rounded-lg transition-colors duration-300 flex items-center shadow-sm disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-gray-900 hover:bg-blue-800 hover:text-white"
                    >
                        <Icon name="material-symbols:chevron-right" class="transition-colors duration-300 text-current" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import type { IProduct } from '~/types/product'
    import { useProductsByCategory } from '~/composables/useProductsByCategory'

    const { products: bestsellerProducts, loading: loadingBestsellers } = useProductsByCategory(33)

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
            <h1 class="text-h1-normal font-medium text-blue-900 font-saira mb-12">
                Pretraživali ste: {{ searchTerm }}
            </h1>

            <div v-if="loading">
                Učitavanje rezultata...
            </div>
            <div v-else-if="products.length === 0" class="text-neutral-600 pb-12 ml-2">
                Nema rezultata za "{{ searchTerm }}"
            </div>
            
            <div v-else class=" grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-2 sm:gap-x-4 gap-y-10 gap-6 mb-10">
                <ProductCard v-for="product in products" :key="product.id" :product="product" />
            </div>

            <div class="container pt-8 mx-auto border-t border-neutralBlue-100">
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
        </div>
    </div>
</template>